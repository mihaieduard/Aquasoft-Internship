import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Hotel } from '../entities/hotel.entity';
import { PriceOffer } from '../entities/priceOffer.entity';
import { Airport } from '../entities/airports.entity';
import { HotelsService } from './hotels.service';
import { City } from '../entities/cities.entity';
import { HotelsController } from './hotels.controller';
import { JwtModule } from '@nestjs/jwt';
import { Region } from '../entities/region.entity';
import { Zone } from '../entities/zone.entity';
import { HotelGroup } from '../entities/hotelGroup.entity';


@Module({
  imports: [
    SequelizeModule.forFeature([
      Hotel,
      Airport,
      PriceOffer,
      City,
      Region,
      Zone,
      HotelGroup
    ]),
    JwtModule
  ],
  controllers: [HotelsController],
  providers: [HotelsService],
})
export class HotelsModule {}