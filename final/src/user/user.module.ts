import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserController } from './user.controller';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [SequelizeModule.forFeature([User]),],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
