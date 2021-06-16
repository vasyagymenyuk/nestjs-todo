import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsEmail, IsInt, IsString, IsUUID } from 'class-validator';
import { TodoEntity } from 'src/todo/entities/todo.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity /*implements IUser*/ extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsString()
  @Column()
  name: string;

  @IsString()
  @Column()
  lastName: string;

  @IsEmail()
  @IsString()
  @Column({
    unique: true,
  })
  email: string;

  @IsString()
  @Exclude()
  @Column()
  password: string;

  @IsBoolean()
  @Column({
    default: false,
  })
  deleted: boolean;

  @OneToMany(() => TodoEntity, (todo) => todo.user)
  @Exclude()
  todos: TodoEntity[];
}
