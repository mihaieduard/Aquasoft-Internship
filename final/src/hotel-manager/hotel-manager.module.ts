import { Module } from '@nestjs/common';
import { HotelManagerService } from './hotel-manager.service';
import { HotelManagerController } from './hotel-manager.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../entities/user.entity';
import { BlacklistGuard } from '../auth/blacklist.guard';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module'; // Import UserModule here
import { AuthModule } from 'src/auth/auth.module';
import { Hotel } from 'src/entities/hotel.entity';
@Module({
  imports: [
    SequelizeModule.forFeature([User, Hotel]),
    JwtModule,
    UserModule,
    AuthModule,
  ], // Add this line to import UserModule],

  providers: [HotelManagerService, BlacklistGuard],
  controllers: [HotelManagerController],
})
export class HotelManagerModule {}

