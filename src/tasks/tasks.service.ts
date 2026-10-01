import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';
import { Task } from './entities/task.entity.js';
import { Like, Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
  @InjectRepository(Task)
  private readonly taskRepository: Repository<Task>){   }
  async create(createTaskDto: CreateTaskDto) {
    const newTask = this.taskRepository.create(createTaskDto)
      return await this.taskRepository.save(newTask);
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
      whereCondition.title = Like(`%${qs}%`);
    }
    
    const [result, totalItems] = await this.taskRepository.findAndCount({
      where: whereCondition,
      skip: skip,
      take: defaultLimit,
      order: { id: 'DESC' }, // Sắp xếp mới nhất lên đầu
      relations: { project: true, assignee: true }, // Dùng object thay vì array để tránh lỗi TypeScript của TypeORM
    });

    // 5. Trả về kết quả phân trang
    return {
      data: result,
      meta: {
        current: page,
        pageSize: defaultLimit,
        total: totalItems,
        totalPages: Math.ceil(totalItems / defaultLimit),
      }
    };
  }

  async findOne(id: number) {
    const exTask = await this.taskRepository.findOne({
      where: {id: id},
      relations: { project: true, assignee: true } // Sửa thành object
    });
    if(!exTask){
    throw new NotAcceptableException("Không thấy công việc nào như vậy cả")
    }
    return exTask
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const updateTask = await this.taskRepository.update(id, updateTaskDto)
    if(!updateTask){
      throw new NotAcceptableException("Không có cxoong việc nào như thế cả")
    }
    return updateTask
  }

  async remove(id: number) {
    const removeTask = await this.taskRepository.delete(id);
    if(!removeTask){
      throw new NotAcceptableException("Xóa công việc thất bại")
    }
    return {
      message: "Xóa tành công",
      id: id, 
    }
  }
}
