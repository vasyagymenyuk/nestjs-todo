import { IsBoolean, IsEmail, IsInt, IsString } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity implements IUser {
  @IsInt()
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column()
  name: string;

  @IsString()
  @Column()
  lastName: string;

  @Column({
    unique: true,
  })
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Column()
  password: string;

  @IsBoolean()
  @Column({
    default: false,
  })
  deleted: boolean;
}
