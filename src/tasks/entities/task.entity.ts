import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import type { Relation } from 'typeorm';
import { Project } from '../../projects/entities/project.entity.js';
import { User } from '../../users/entities/user.entity.js';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: 'todo' })
  status: string;

  @Column({ type: 'int' })
  projectId: number;

  @Column({ type: 'int', nullable: true })
  assigneeId: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => Project)
  @JoinColumn({ name: 'projectId' })
  project: Relation<Project>;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'assigneeId' })
  assignee: Relation<User>;
}
