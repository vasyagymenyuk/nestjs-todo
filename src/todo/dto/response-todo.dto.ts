import { IsBoolean, IsString, IsUUID } from 'class-validator';

export class ResponseTodoDto {
  @IsString()
  title: string;
  @IsString()
  content?: string;
  @IsBoolean()
  isDone: boolean;
  @IsUUID()
  id: string;
}
