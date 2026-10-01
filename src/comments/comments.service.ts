import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { UpdateCommentDto } from './dto/update-comment.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Comment } from './entities/comment.entity.js';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>){}

  async create(createCommentDto: CreateCommentDto) {
    const newComment = this.commentRepository.create(createCommentDto)
    return await this.commentRepository.save(newComment)
  }

  async findAll(currentPage: string, limit: string, qs: string) {
    // 1. Ép kiểu và gán giá trị mặc định nếu client không truyền
    const page = parseInt(currentPage, 10) > 0 ? parseInt(currentPage, 10) : 1;
    const defaultLimit = parseInt(limit, 10) > 0 ? parseInt(limit, 10) : 10;
    
    // 2. Tính số bản ghi cần bỏ qua
    const skip = (page - 1) * defaultLimit;
    
    // 3. Xử lý điều kiện lọc từ qs
    const whereCondition: any = {};
    if (qs) {
      whereCondition.content = Like(`%${qs}%`); // Tìm kiếm theo nội dung comment
    }
    
    // 4. Lấy dữ liệu
    const [result, totalItems] = await this.commentRepository.findAndCount({
      where: whereCondition,
      skip: skip,
      take: defaultLimit,
      order: { id: 'DESC' }, 
      relations: { user: true }, // Phải join bảng user để lấy thông tin tác giả
    });

    // 5. Map lại dữ liệu cho đúng format yêu cầu
    const mappedData = result.map(comment => ({
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt,
      author: {
        id: comment.user?.id,
        fullName: comment.user?.Full_name // Trong Entity User bạn đặt là Full_name
      }
    }));

    // 6. Trả về kết quả
    return {
      data: mappedData,
      meta: {
        current: page,
        pageSize: defaultLimit,
        total: totalItems,
        totalPages: Math.ceil(totalItems / defaultLimit),
      }
    };
  }

  async findOne(id: number) {
    const exComment = await this.commentRepository.findOne({where: {id: id}})
    if(!exComment){
      throw new NotAcceptableException("Không có comment nà")
    }

    return {
      id: id,
      exComment
    }
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const updateComment = await this.commentRepository.update(id, updateCommentDto)
    if(!updateComment){
      throw new NotAcceptableException("Không có comment này")
    }
    return{
      id: id,
      message:"Đã cập nhập thành công",
      updateComment
    }
  }

  async remove(id: number) {
    const deleteComment = await this.commentRepository.delete(id)
    if(!deleteComment){
      throw new NotAcceptableException("Không có comment này")
    }
    return{
      id: id,
      message:"Đã xóa comment thành công thành công",
      deleteComment
    }
  }
}
