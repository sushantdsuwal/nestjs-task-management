// import { EntityRepository, Repository } from 'typeorm';
// import { Task } from './task.entity';

// @EntityRepository(Task)
// export class TasksRepository extends Repository<Task> { }

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

export class TasksRepository extends Repository<Task> {
  constructor(
    @InjectRepository(Task)
    private TaskRepository: Repository<Task>,
  ) {
    super(
      TaskRepository.target,
      TaskRepository.manager,
      TaskRepository.queryRunner,
    );
  }

  async findTaskById(id: string): Promise<Task> {
    return await this.TaskRepository.findOneBy({ id });
  }
}
