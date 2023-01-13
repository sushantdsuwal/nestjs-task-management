import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@Injectable()
export class UserRepository {
  @InjectRepository(User)
  private userRepository: Repository<User>;
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    // const user = this.userRepository.create({ username, password });
    // await this.userRepository.save(user);
    await this.userRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({ username, password })
      .execute();
  }
}
