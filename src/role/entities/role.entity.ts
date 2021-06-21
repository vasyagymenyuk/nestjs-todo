import { IsString } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('role')
export class RoleEntity /*implements IUser*/ extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsString()
  @Column()
  value: string;

  @IsString()
  @Column()
  description: string;
}
