import { IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'Tiêu đề (title) không được để trống' })
  @IsString({ message: 'Tiêu đề phải là một chuỗi' })
  title: string;

  @IsOptional()
  @IsString({ message: 'Mô tả (description) phải là một chuỗi' })
  description?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsNotEmpty({ message: 'Mã dự án (projectId) không được để trống' })
  @IsInt({ message: 'Mã dự án phải là một số nguyên' })
  projectId: number;

  @IsOptional()
  @IsInt({ message: 'Mã người được giao (assigneeId) phải là một số nguyên' })
  assigneeId?: number;
}
