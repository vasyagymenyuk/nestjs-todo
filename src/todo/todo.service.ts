import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from './entities/todo.entity';
import { validateOrReject } from 'class-validator';
import { classToPlain } from 'class-transformer';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    await validateOrReject(createTodoDto);

    const todo = this.todoRepository.create(classToPlain(createTodoDto));

    return await todo.save();
  }

  findAll() {
    return classToPlain(this.todoRepository.find());
  }

  getByUserId(id: number) {
    return {
      id,
      title: 'Run TestApp',
      isDone: true,
    };
  }

  cancelById(id: number) {
    return {
      id: 2,
      title: 'Run TestApp',
      isDone: false,
    };
  }

  execute(id: number) {
    return {
      id,
      title: 'Run TestApp',
      isDone: true,
    };
  }

  removeByiD(id: number, res: Response) {
    res
      .status(HttpStatus.OK)
      .send({ message: `todo with id: ${id} removed` })
      .end();
  }
}
