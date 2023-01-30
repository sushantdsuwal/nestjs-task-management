import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatus } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { User } from '../auth/user.entity';
import { TasksService } from './tasks.service';
import { Logger } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TasksController'); // context
  constructor(
    private tasksService: TasksService, // private configService: ConfigService,
  ) {}

  @Get()
  getTasks(
    @Query() filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    this.logger.verbose(
      `user "${user.username}" retrieving all tasks.
      Filter: ${JSON.stringify(filterDto)}`,
    );
    return this.tasksService.getTasks(filterDto, user);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string, @GetUser() user: User): void {
    this.tasksService.deleteTask(id, user);
  }

  @Patch('/:id')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatus: UpdateTaskStatus,
    @GetUser() user: User,
  ): Promise<Task> {
    const { status } = updateTaskStatus;
    return this.tasksService.updateTaskStatus(id, status, user);
  }
}
