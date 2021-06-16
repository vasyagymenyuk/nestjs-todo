import { IsBoolean, IsInt, IsString, IsUUID } from 'class-validator';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('todo')
export class TodoEntity /*implements ITodo*/ extends BaseEntity {
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

  @IsBoolean()
  @Column({
    default: false,
  })
  isDeleted: boolean;

  @ManyToOne((type) => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  @IsUUID()
  user: string;
}
