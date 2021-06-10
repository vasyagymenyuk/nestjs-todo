import { IsBoolean, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  title: string;
  @IsString()
  content?: string;
  @IsBoolean()
  isDone: boolean; // default: false
}
