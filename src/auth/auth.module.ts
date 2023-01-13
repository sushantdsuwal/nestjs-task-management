import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User])], //user entity
  providers: [AuthService, UserRepository],
  controllers: [AuthController],
})
export class AuthModule {}
