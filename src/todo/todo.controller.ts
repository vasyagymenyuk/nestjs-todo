import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

interface todo {
  id: number;
  title: string;
  content?: string;
  isDone: boolean;
}

@Controller('todo')
export class TodoController {
  @Post()
  create() {
    return '200 Todo created';
  }

  @Get()
  findAll(): Array<todo> {
    return [
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
    ];
  }

  @Get(':id')
  getByUserId(): todo {
    return {
      id: 2,
      title: 'Run TestApp',
      isDone: true,
    };
  }

  @Put(':todoId')
  execute(): todo {
    return {
      id: 2,
      title: 'Run TestApp',
      isDone: true,
    };
  }

  @Patch(':todoId')
  cancelById(): todo {
    return {
      id: 2,
      title: 'Run TestApp',
      isDone: false,
    };
  }

  @HttpCode(204)
  @Delete(':todoId')
  removeById(): any {
    return 'Todo deleted';
  }
}
