import { Injectable } from '@nestjs/common';
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

  async create(createUserDto: CreateUserDto) {
    const createUserData = plainToClass(CreateUserDto, createUserDto);
    await validateOrReject(createUserData);

    const salt = await bcrypt.genSalt(12);
    const encryptedPass = await bcrypt.hash(createUserData.password, salt);

    createUserData.password = encryptedPass;

    const user = this.userRepository.create(classToPlain(createUserData));

    return await user.save();
  }

  async findOne(id: string, req: IReqWithUser) {
    return `This action returns a #${id} user`;
  }

  findAll() {
    return classToPlain(this.userRepository.find());
  }

  async findUserByEmail(email: string, req: IReqWithUser) {
    return await this.userRepository.findOne({ where: { email } });
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
