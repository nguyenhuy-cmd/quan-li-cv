import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty({ message: 'Nội dung bình luận không được để trống' })
  @IsString({ message: 'Nội dung bình luận phải là một chuỗi' })
  content: string;

  @IsNotEmpty({ message: 'Mã công việc (taskId) không được để trống' })
  @IsInt({ message: 'Mã công việc phải là một số nguyên' })
  taskId: number;

  @IsNotEmpty({ message: 'Mã người dùng (userId) không được để trống' })
  @IsInt({ message: 'Mã người dùng phải là một số nguyên' })
  userId: number;
}
