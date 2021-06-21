import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name?: string;

  @IsString()
  lastName?: string;

  @ApiProperty({
    description: 'email for registering',
    example: 'user@mail.com',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'user443_fsssa_fd',
    description: 'Password for registering (length:8-25)',
  })
  @IsString()
  @MinLength(8, {
    message: 'Password is too short',
  })
  @MaxLength(25, {
    message: 'Password is too long',
  })
  password: string;
}
