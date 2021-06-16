import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto implements ILoginUser {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
