import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { User } from '../entities/user.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminController } from './admin.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module'; // Import AuthModule here


@Module({
  imports: [ SequelizeModule.forFeature([User]),
  JwtModule,
  AuthModule,], // Add this line to import AuthModule],
  providers: [AdminService],
  controllers: [AdminController]
})
export class AdminModule {}
