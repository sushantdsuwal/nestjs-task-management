import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Task } from './task.entity';
import { TasksRepository } from './task.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Task]), AuthModule], // here we provide the TypeOrm support as usual, specifically for our TaskEntity in this case
  providers: [TasksService, TasksRepository], // here we provide our custom repo
  controllers: [TasksController],
})
export class TasksModule {}
