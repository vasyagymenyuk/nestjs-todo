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

export interface todo {
  id: number;
  title: string;
  content?: string;
  isDone: boolean;
}

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post()
  create(
    @Body() createToDoDto: CreateTodoDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.todoService.create(createToDoDto, res);
  }

  @Get()
  findAll(@Res() res): todo[] {
    return this.todoService.findAll(res);
  }

  @Get(':id')
  getByUserId(@Param('id', ParseIntPipe) id: number): todo {
    return this.todoService.getByUserId(id);
  }

  @Put(':todoId')
  execute(@Param('todoId', ParseIntPipe) id: number): todo {
    return this.todoService.execute(id);
  }

  @Patch(':todoId')
  cancelById(@Param('todoID', ParseIntPipe) id: number): todo {
    return this.todoService.cancelById(id);
  }

  @Delete('delete/:todoId')
  removeById(
    @Param('todoId', ParseIntPipe) id: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.todoService.removeByiD(id, res);
  }
}
