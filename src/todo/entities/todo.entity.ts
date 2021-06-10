import { IsBoolean, IsInt, IsString } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('todo')
export class TodoEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @IsInt()
  id: number;

  @Column()
  @IsString()
  title: string;

  @Column()
  @IsString()
  content?: string;

  @Column({
    default: false,
  })
  @IsBoolean()
  isDone: boolean;
}
