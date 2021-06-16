import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './UserService';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { validateOrReject } from 'class-validator';
import { IReqWithUser } from './interfaces/ReqWithUser.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.userService.create(createUserDto);
    return;
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: IReqWithUser) {
    return await this.userService.findOne(id, req);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: IReqWithUser,
  ) {
    return await this.userService.update(id, updateUserDto, req);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: IReqWithUser) {
    await this.userService.deleteUser(id, req);
    return;
  }
}
