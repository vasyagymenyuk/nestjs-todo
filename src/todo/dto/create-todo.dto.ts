export class CreateTodoDto {
  id: number;
  title: string;
  content?: string;
  isDone: boolean; // default: false
}
