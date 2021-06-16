import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TodoService } from './TodoService';
import { TodoController } from './TodoController';
import { authMiddleware } from 'src/auth/middleware/auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './entities/todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  controllers: [TodoController],
  providers: [TodoService],
  exports: [TypeOrmModule],
})
export class TodoModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(authMiddleware).forRoutes(TodoController);
  }
}
