import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import type { Relation } from "typeorm";
import { User } from "../../users/entities/user.entity.js";

@Entity('projects')
export class Project {
  @ApiProperty({
    example: 1,
    description: 'Mã định danh duy nhất của Project',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Xây dựng Backend với NestJS',
    description: 'Tên của dự án',
  })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ApiPropertyOptional({
    example: 'Dự án bài tập lớn kết thúc môn học 2 tuần',
    description: 'Mô tả chi tiết dự án (có thể null)',
    nullable: true,
  })
  @Column({ type: 'text', nullable: true })
  description: string | null;

  @ApiProperty({
    example: 1,
    description: 'ID của người tạo/chủ sở hữu (Owner)',
  })
  @Column({ type: 'int' })
  ownerId: number;

  @ApiProperty({
    example: '2026-03-30T10:00:00.000Z',
    description: 'Thời điểm tạo bản ghi',
  })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty({
    example: '2026-03-30T10:00:00.000Z',
    description: 'Thời điểm cập nhật bản ghi gần nhất',
  })
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  // Thiết lập mối quan hệ với bảng users
  @ManyToOne(() => User)
  @JoinColumn({ name: 'ownerId' })
  owner: Relation<User>;
}
