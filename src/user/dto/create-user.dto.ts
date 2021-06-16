import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  lastName?: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, {
    message: 'Password is too short',
  })
  @MaxLength(25, {
    message: 'Password is too long',
  })
  password: string;
}
