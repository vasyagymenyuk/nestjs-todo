import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from './entities/todo.entity';
import { validateOrReject } from 'class-validator';
import { classToPlain } from 'class-transformer';
import { ResponseTodoDto } from './dto/response-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<ResponseTodoDto> {
    await validateOrReject(createTodoDto);

    const todo = this.todoRepository.create(createTodoDto);

    return await todo.save();
  }

  async findAll(): Promise<TodoEntity[]> {
    return await this.todoRepository.find();
  }

  async getTodoByUserId(id: string) {
    return {
      id,
      title: 'Run TestApp',
      isDone: true,
    };
  }

  async cancelById(id: string) {
    return {
      id: 2,
      title: 'Run TestApp',
      isDone: false,
    };
  }

  async applyTodo(id: string) {
    return {
      id,
      title: 'Run TestApp',
      isDone: true,
    };
  }

  async removeByiD(id: string): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
