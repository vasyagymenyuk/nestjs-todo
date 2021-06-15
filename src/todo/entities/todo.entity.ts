import { IsBoolean, IsInt, IsString } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('todo')
export class TodoEntity implements ITodo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsString()
  @Column()
  title: string;

  @IsString()
  @Column({
    nullable: true,
  })
  content?: string;

  @IsBoolean()
  @Column({
    default: false,
  })
  isDone: boolean;
}
