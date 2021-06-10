import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Response } from 'express';

@Injectable()
export class TodoService {
  create(createTodoDto: CreateTodoDto, res: Response) {
    res.status(HttpStatus.CREATED).send({ success: true, data: createTodoDto });
  }

  findAll(res) {
    return res.send([
      {
        id: 1,
        title: 'Make TestApp',
        isDone: false,
      },
      {
        id: 2,
        title: 'Run TestApp',
        isDone: true,
      },
    ]);
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
