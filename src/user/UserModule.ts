import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserService } from './UserService';
import { UserController } from './UserController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { authMiddleware } from 'src/auth/middleware/auth.middleware';
import { METHODS } from 'http';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule, UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(authMiddleware)
      .exclude(
        { path: 'user', method: RequestMethod.POST },
        { path: 'user', method: RequestMethod.GET },
        { path: 'user/:id', method: RequestMethod.DELETE },
      )
      .forRoutes(UserController);
  }
}
