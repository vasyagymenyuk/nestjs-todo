import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from './entities/todo.entity';
import { validateOrReject } from 'class-validator';
import { ResponseTodoDto } from './dto/response-todo.dto';
import { IReqWithUser } from 'src/user/interfaces/ReqWithUser.interface';
import { IReqUser } from 'src/user/interfaces/ReqUser.interface';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { plainToClass } from 'class-transformer';
@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}

  async create(
    createTodoDto: CreateTodoDto,
    req: IReqWithUser,
  ): Promise<ResponseTodoDto> {
    await validateOrReject(createTodoDto);

    const todo = this.todoRepository.create(createTodoDto);

    todo.user = req.user.id;

    return await todo.save();
  }

  async findAll(req: IReqWithUser): Promise<TodoEntity[]> {
    const todos = await this.todoRepository.find({
      where: { user: req.user.id, isDeleted: false },
    });
    if (!todos) {
      throw new NotFoundException();
    }
    return todos;
  }

  async cancelTodo(id: string, req: IReqWithUser): Promise<void> {
    const todo = await this.todoRepository.findOne({
      where: { id, user: req.user.id },
    });
    if (!todo) {
      throw new NotFoundException();
    }

    todo.isDone = false;

    await todo.save();
    return;
  }

  async applyTodo(id: string, req: IReqWithUser) {
    const todo = await this.todoRepository.findOne({
      where: { id, user: req.user.id },
    });
    if (!todo) {
      throw new NotFoundException();
    }

    todo.isDone = true;

    await todo.save();
    return;
  }

  async removeTodoByiD(id: string, req: IReqWithUser): Promise<void> {
    const todo = await this.todoRepository.findOne({
      where: { id, user: req.user.id },
    });
    if (!todo) {
      throw new NotFoundException();
    }

    todo.isDeleted = true;

    await todo.save();
    return;
  }

  async updateTodo(
    id: string,
    updateTodoDto: UpdateTodoDto,
    req: IReqWithUser,
  ) {
    const todoData = plainToClass(UpdateTodoDto, updateTodoDto);
    await validateOrReject(todoData);
    return await this.todoRepository.update(
      { id, user: req.user.id },
      todoData,
    );
  }
}
