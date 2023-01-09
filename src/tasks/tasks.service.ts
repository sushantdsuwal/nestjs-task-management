import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
// import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    private readonly tasksRepository: TasksRepository, // import as usual
  ) {}

  // constructor(
  //   // @InjectRepository(Task)
  //   // private tasksRepository: TasksRepository,
  //   private connection: Connection,
  // ) {
  //   this.tasksRepository = this.connection.getRepository(Task);
  // }
  // // private tasks: Task[] = [];
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (task.title === search || task.description.includes(search)) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     });
  //   }
  //   return tasks;
  // }
  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  // getTaskById(taskId: string): Task {
  //   const task = this.tasks.find((task) => task.id === taskId);
  //   if (!task) {
  //     throw new NotFoundException(`Task with id ${taskId} not found`);
  //   }
  //   return task;
  // }

  // async getTaskById(id: string): Promise<Task> {
  //   const found = await this.tasksRepository.findOneBy({ id });
  //   console.log('found', found);
  //   if (!found) {
  //     throw new NotFoundException(`Task with ID "${id}" not found`);
  //   }
  //   return found;
  // }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findTaskById(id);
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }
  // deleteTask(taskId: string): void {
  //   this.getTaskById(taskId);
  //   this.tasks = this.tasks.filter((task) => task.id !== taskId);
  // }
  // updateTaskStatus(id: string, status: TaskStatus) {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
