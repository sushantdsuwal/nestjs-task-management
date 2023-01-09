import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksRepository } from './task.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task])], // here we provide the TypeOrm support as usual, specifically for our TaskEntity in this case
  providers: [TasksService, TasksRepository], // here we provide our custom repo
  controllers: [TasksController],
})
export class TasksModule {}
