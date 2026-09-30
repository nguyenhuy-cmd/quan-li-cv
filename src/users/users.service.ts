import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { User, UserRole } from './entities/user.entity.js';
import { genSaltSync, hashSync } from 'bcrypt';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }


  hashPassWord(password: string) {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  }

  async create(createUserDto: CreateUserDto) {
    // 1. Mã hóa mật khẩu (không cần await vì hàm trên chạy đồng bộ/sync)
    const hashPassword = this.hashPassWord(createUserDto.password);

    // 2. Ghi đè mật khẩu đã mã hóa vào DTO
    createUserDto.password = hashPassword;

    // 3. Tạo user và lưu vào database
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  async findAll(currentPage: string, limit: string, qs: any) {
    // 1. Ép kiểu và gán giá trị mặc định nếu client không truyền
    const page = parseInt(currentPage, 10) > 0 ? parseInt(currentPage, 10) : 1;
    const defaultLimit = parseInt(limit, 10) > 0 ? parseInt(limit, 10) : 10;

    // 2. Tính số bản ghi cần bỏ qua
    const skip = (page - 1) * defaultLimit;

    // 3. Xử lý điều kiện lọc từ qs (Ví dụ: tìm kiếm theo tên nếu có truyền name)
    const whereCondition: any = {};
    if (qs?.name) {
      whereCondition.name = Like(`%${qs.name}%`);
    }
    if (qs?.email) {
      whereCondition.email = Like(`%${qs.email}%`);
    }

    // 4. Lấy dữ liệu và đếm tổng số bản ghi
    const [result, totalItems] = await this.userRepository.findAndCount({
      where: whereCondition,
      skip: skip,
      take: defaultLimit,
      order: { id: 'DESC' }, // Sắp xếp bản ghi mới nhất lên đầu
    });

    // 5. Tính tổng số trang
    const totalPages = Math.ceil(totalItems / defaultLimit);

    // 6. Trả về đúng format chuẩn cho Frontend
    return {
      meta: {
        current: page,          // Trang hiện tại
        pageSize: defaultLimit,  // Số bản ghi trên 1 trang
        pages: totalPages,       // Tổng số trang
        total: totalItems,       // Tổng số bản ghi thỏa điều kiện
      },
      result,                    // Mảng dữ liệu trả về
    };
  }

  async findOne(id: number) {
    const foundUser = await this.userRepository.findOne({where: {id}});
    if(!foundUser){
      throw new NotFoundException("Tài khoản không tồn tại")
    }
    return foundUser;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const foundUser = await this.userRepository.update(id, updateUserDto)
    if(!foundUser){
      throw new NotFoundException('Không tìm thấy user')
    }
    return `This action updates a #${id} user`;
  }

  async  remove(id: number) {
    const foundUser  = await this.userRepository.delete(id);
    if(!foundUser){
      throw new NotFoundException("Tài khoản không tồn tại")
    }
    return {
      id,
      message: "Tài khoản đã bị xóa"
    };
  }
  async register(registerUserDto: RegisterUserDto){
    const {Full_name, email, password, role} = registerUserDto;
    const existsUser =  await this.userRepository.findOne({where: {email}});
    if(existsUser){
      throw new BadRequestException("Tài khoản đã tồn tại")
    }
    const hashPasswor = this.hashPassWord(password);
    const newUser = this.userRepository.create({
      Full_name,
      email,
      password: hashPasswor,
      role: role as UserRole
    })
    return await this.userRepository.save(newUser)
  }
}

