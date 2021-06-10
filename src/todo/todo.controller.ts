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
  Res,
  Req,
  Redirect,
  Header,
  HttpStatus,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Response } from 'express';
import { identity } from 'rxjs';

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
  getByUserId(@Param('id') id): todo {
    return this.todoService.getByUserId(+id);
  }

  @Put(':todoId')
  execute(@Param('todoId') id): todo {
    return this.todoService.execute(+id);
  }

  @Patch(':todoId')
  cancelById(@Param('todoID') id): todo {
    return this.todoService.cancelById(+id);
  }

  @Delete('delete/:todoId')
  removeById(
    @Param('todoId') id,
    @Res({ passthrough: true }) res: Response,
  ): any {
    return this.todoService.removeByiD(+id, res);
  }
}
