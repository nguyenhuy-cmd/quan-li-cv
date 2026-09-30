import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn } from "typeorm";
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}
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
    
}
