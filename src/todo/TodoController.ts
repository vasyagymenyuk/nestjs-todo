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
  Req,
} from '@nestjs/common';
import { TodoService } from './TodoService';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { classToPlain } from 'class-transformer';
import { IReqWithUser } from 'src/user/interfaces/ReqWithUser.interface';
import { IReqUser } from 'src/user/interfaces/ReqUser.interface';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post()
  async create(
    @Body() createToDoDto: CreateTodoDto,
    @Req() req: IReqWithUser,
  ): Promise<any> {
    return await classToPlain(this.todoService.create(createToDoDto, req));
  }

  @Get()
  async findAll(@Req() req: IReqWithUser): Promise<any> {
    return await classToPlain(this.todoService.findAll(req));
  }

  @Put('/:todoId/apply')
  async applyTodo(
    @Param('todoId') id: string,
    @Req() req: IReqWithUser,
  ): Promise<void> {
    return await this.todoService.applyTodo(id, req);
  }

  @Put('/:todoId/cancel')
  async cancelTodo(
    @Param('todoId') id: string,
    @Req() req: IReqWithUser,
  ): Promise<void> {
    return await this.todoService.cancelTodo(id, req);
  }

  @Delete('/:todoId')
  async removeTodoById(@Param('todoId') id: string, @Req() req: IReqWithUser) {
    return this.todoService.removeTodoByiD(id, req);
  }

  @Put('/:todoId/update')
  async updateTodo(
    @Param('todoId') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @Req() req: IReqWithUser,
  ) {
    return await this.todoService.updateTodo(id, updateTodoDto, req);
  }
}
