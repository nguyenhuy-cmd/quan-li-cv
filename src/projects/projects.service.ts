import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto.js';
import { UpdateProjectDto } from './dto/update-project.dto.js';
import { Repository, Like } from 'typeorm';
import { Project } from './entities/project.entity.js';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ){}

  async create(createProjectDto: CreateProjectDto) {
    // 1. Tạo đối tượng project mới (lệnh này chạy đồng bộ nên không cần await)
    const newProject = this.projectRepository.create(createProjectDto);
    
    // 2. Lưu vào database (lệnh này cần await)
    return await this.projectRepository.save(newProject);
  }

  async findAll(currentPage: string, limit: string, qs: any) {
    // 1. Ép kiểu và gán giá trị mặc định nếu client không truyền
    const page = parseInt(currentPage, 10) > 0 ? parseInt(currentPage, 10) : 1;
    const defaultLimit = parseInt(limit, 10) > 0 ? parseInt(limit, 10) : 10;
    
    // 2. Tính số bản ghi cần bỏ qua
    const skip = (page - 1) * defaultLimit;
    
    // 3. Xử lý điều kiện lọc từ qs
    const whereCondition: any = {};
    if (qs?.name) {
      whereCondition.name = Like(`%${qs.name}%`);
    }
    
    // 4. Lấy dữ liệu và đếm tổng số bản ghi
    const [result, totalItems] = await this.projectRepository.findAndCount({
      where: whereCondition,
      skip: skip,
      take: defaultLimit,
      order: { id: 'DESC' }, // Sắp xếp mới nhất lên đầu
    });

    // 5. Tính tổng số trang
    const totalPages = Math.ceil(totalItems / defaultLimit);

    // 6. Trả về đúng format chuẩn cho Frontend
    return {
      meta: {
        current: page,          // Trang hiện tại
        pageSize: defaultLimit,  // Số bản ghi trên 1 trang
        pages: totalPages,       // Tổng số trang
        total: totalItems,       // Tổng số bản ghi
      },
      result,
    };
  }

  async findOne(id: number) {
    const exProject = await this.projectRepository.findOne({where: {id}})
    if(!exProject){
      throw new NotFoundException('Không tìm thấy ID của oroject trên')
    }
    return exProject;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const exUpdate = await this.projectRepository.update(id, updateProjectDto)
    if(!exUpdate){
      throw new NotFoundException('Không tìm thấy project')
    }
    return {
      id: id,
      exUpdate
    };
  }

  async remove(id: number) {
    const exDelete = await this.projectRepository.delete(id);
    if(!exDelete){
      throw new NotFoundException('không tìm thấy project')
    }
    return {
      id: id,
      exDelete
    };
  }
}
