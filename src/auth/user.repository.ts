import {
  ConflictException,
  // Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
// @Injectable()
export class UserRepository extends Repository<User> {
  // @InjectRepository(User)
  // private userRepository: Repository<User>;
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super(
      userRepository.target,
      userRepository.manager,
      userRepository.queryRunner,
    );
  }

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    // hash
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      username,
      password: hashPassword,
    });
    try {
      await this.userRepository.save(user);
    } catch (error) {
      // ?: should handle this error in service
      if (error.code === '23505') {
        // duplicate username
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
    // await this.userRepository
    //   .createQueryBuilder()
    //   .insert()
    //   .into(User)
    //   .values({ username, password })
    //   .execute();
  }
}
