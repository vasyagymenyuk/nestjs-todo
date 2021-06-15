import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Res,
  ParseIntPipe,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Response } from 'express';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { classToClass, classToPlain } from 'class-transformer';

export interface ITodo {
  id: string;
  title: string;
  content?: string;
  isDone: boolean;
}

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post()
  async create(@Body() createToDoDto: CreateTodoDto): Promise<any> {
    return await classToPlain(this.todoService.create(createToDoDto));
  }

  @Get()
  async findAll(): Promise<any> {
    return await classToPlain(this.todoService.findAll());
  }

  @Get('/:id')
  async getByUserId(@Param('id') id: string): Promise<ITodo> {
    return await this.todoService.getTodoByUserId(id);
  }

  @Put('/:todoId')
  async applyTodo(@Param('todoId') id: string): Promise<UpdateTodoDto> {
    return await this.todoService.applyTodo(id);
  }

  @Patch('/:todoId')
  async cancelTodo(@Param('todoID') id: string): Promise<UpdateTodoDto> {
    return await this.todoService.cancelById(id);
  }

  @Delete('/:todoId')
  async removeTodoById(@Param('todoId') id: string) {
    return this.todoService.removeByiD(id);
  }
}
