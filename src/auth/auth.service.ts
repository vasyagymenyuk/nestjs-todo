import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { classToPlain, plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<IJwtToken> {
    const user = await this.validateUser(loginUserDto);
    return this.generateToken(user);
  }

  async register(createUserDto: CreateUserDto): Promise<IJwtToken> {
    const createUserData = plainToClass(CreateUserDto, createUserDto);
    await validateOrReject(createUserData);

    const candidate = await this.userService.findUserByEmail(
      createUserDto.email,
    );

    if (candidate) {
      throw new HttpException(
        { message: 'Пользователь с таким E-mail уже зарегистрирован' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const password = await bcrypt.hash(createUserData.password, 12);
    const user = this.userRepository.create(
      classToPlain({ ...createUserData, password }),
    );

    await user.save();

    return await this.generateToken(user);
  }

  private async generateToken(user: UserEntity): Promise<IJwtToken> {
    const payload = { email: user.email, id: user.id /*roles: user.roles*/ };

    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
    };
  }

  private async validateUser(userDto: LoginUserDto) {
    const user = await this.userService.findUserByEmail(userDto.email);

    if (!user) {
      throw new UnauthorizedException({
        message: 'Неверный email',
      });
    }
    const passwordCompare = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    if (passwordCompare) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Неверный пароль' });
  }
}
