import { IsBoolean, IsEmail, IsInt, IsString } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @IsInt()
  id: number;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  lastName?: string;

  @Column()
  @IsString()
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  password: string;

  @Column({
    default: false,
  })
  @IsBoolean()
  deleted: boolean;
}
