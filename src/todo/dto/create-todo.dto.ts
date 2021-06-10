export class CreateTodoDto {
  title: string;
  content?: string;
  isDone: boolean; // default: false
}
