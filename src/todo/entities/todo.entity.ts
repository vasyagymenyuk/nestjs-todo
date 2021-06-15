import { IsBoolean, IsInt, IsString } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ITodo } from '../todo.controller';

@Entity('todo')
export class TodoEntity /*implements ITodo* - нет методов для работы с базой*/
  extends BaseEntity
{
  @PrimaryGeneratedColumn('uuid')
  // @IsInt() auto makes int
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
