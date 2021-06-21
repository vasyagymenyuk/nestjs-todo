import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { classToPlain, plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { IReqWithUser } from './interfaces/ReqWithUser.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findOne(id: string, req: IReqWithUser): Promise<UserEntity> {
    console.log('COMPARE====', id, req.user.id);

    if (id !== req.user.id) {
      throw new UnauthorizedException();
    }

    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['todos'],
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async findAll() {
    return classToPlain(await this.userRepository.find());
  }

  async findUserByEmail(email: string) {
    const candidate = await this.userRepository.findOne({ where: { email } });

    return candidate;
  }

  async update(id: string, updateUserDto: UpdateUserDto, req: IReqWithUser) {
    return `This action updates a #${id} user`;
  }

  async deleteUser(id: string, req: IReqWithUser): Promise<any> {
    const user = await this.userRepository.findOne(id);
    user.deleted = true;
    return await user.save();
  }
}
