import { IsBoolean, IsString, IsUUID } from 'class-validator';

export class ResponseUserDto {
  @IsString()
  email: string;
  @IsString()
  name: string;
  @IsString()
  lastname: string;
  @IsUUID()
  id: string;
  @IsString()
  password: string;
}
