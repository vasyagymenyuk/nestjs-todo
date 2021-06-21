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
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { classToPlain } from 'class-transformer';
import { IReqWithUser } from 'src/user/interfaces/ReqWithUser.interface';
import { IReqUser } from 'src/user/interfaces/ReqUser.interface';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createToDoDto: CreateTodoDto,
    @Req() req: IReqWithUser,
  ): Promise<any> {
    return await classToPlain(this.todoService.create(createToDoDto, req));
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() req: IReqWithUser): Promise<any> {
    return await classToPlain(this.todoService.findAll(req));
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:todoId/apply')
  async applyTodo(
    @Param('todoId') id: string,
    @Req() req: IReqWithUser,
  ): Promise<void> {
    return await this.todoService.applyTodo(id, req);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:todoId/cancel')
  async cancelTodo(
    @Param('todoId') id: string,
    @Req() req: IReqWithUser,
  ): Promise<void> {
    return await this.todoService.cancelTodo(id, req);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:todoId')
  async removeTodoById(@Param('todoId') id: string, @Req() req: IReqWithUser) {
    return this.todoService.removeTodoByiD(id, req);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:todoId/update')
  async updateTodo(
    @Param('todoId') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @Req() req: IReqWithUser,
  ) {
    return await this.todoService.updateTodo(id, updateTodoDto, req);
  }
}
