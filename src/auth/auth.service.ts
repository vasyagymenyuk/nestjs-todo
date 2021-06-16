import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<IJwtToken> {
    const loginData = plainToClass(LoginUserDto, loginUserDto);
    await validateOrReject(loginData);

    const user = await this.userRepository.findOne({
      where: { email: loginData.email },
    });

    if (!user) {
      throw new NotFoundException();
    }

    const passwordCompare = await bcrypt.compare(
      loginData.password,
      user.password,
    );
    if (!passwordCompare) {
      throw new BadRequestException();
    }

    const access_token = await jwt.sign(
      { uuid: user.id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRES_TIME },
    );

    return {
      access_token,
    };
  }
}
