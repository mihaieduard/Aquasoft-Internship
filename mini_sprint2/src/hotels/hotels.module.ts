// src/hotels/hotels.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Hotel } from './entities/hotel.model';
import { HotelsService } from './hotels.service';
import { HotelsController } from './hotels.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Hotel]), JwtModule],
  controllers: [HotelsController],
  providers: [HotelsService],
})
export class HotelsModule {}
