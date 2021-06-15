import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/TodoModule';
import { UserModule } from './user/UserModule';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'todo_nest',
      entities: ['dist/**/*.entity{.ts,.js}'],
    }),
    UserModule,
    TodoModule,
  ],
})
export class AppModule {}
