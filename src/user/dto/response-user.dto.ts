import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsUUID } from 'class-validator';

export class ResponseUserDto {
  @ApiProperty({
    example: 'user@gmail.com',
    description: 'Email address of user',
  })
  @IsString()
  email: string;

  @ApiProperty({ example: 'Arnold', description: 'firstname of user' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Schwartzneger', description: 'lastname of user' })
  @IsString()
  lastname: string;

  @ApiProperty({
    example: 'fdsahj24kjh-fdsaf-adfhj4khasdf-sdafdsa',
    description: 'Unique user identificator',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    example: 'user443_fsssa_fd',
    description: 'Encrypted user password',
  })
  @IsString()
  password: string;
}
