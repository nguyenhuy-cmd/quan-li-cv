import { IsEmail, IsString, IsNotEmpty, IsEnum } from "class-validator";
import { Entity, Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import type { Relation } from "typeorm";
import { Project } from "../../projects/entities/project.entity.js";
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"varchar", length: 100})
    Full_name: string;

    @Column({type:'varchar', length: 100})
    email: string;

    @Column({type:'varchar', length: 100})
    password: string;

    
    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER
    })
    role:UserRole;

    // Ngày tạo tài khoản - TIMESTAMP (tự động gán khi tạo)
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  // Xóa mềm
  @DeleteDateColumn({type: 'timestamp'})
  deleted_at?: Date;  

  // Một User có thể tạo ra nhiều Project
  @OneToMany(() => Project, project => project.owner)
  projects: Relation<Project>[];
}

export class LoginUserDto{
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
export class RegisterUserDto{
  @IsString()
  @IsNotEmpty()
  Full_name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
    
  @IsEnum(UserRole)
  role:UserRole;
}
