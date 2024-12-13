import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Hotel } from './entities/hotel.model';
import { PriceOffer } from './entities/priceOffer.model';
import { Airport } from './entities/airports.model';
import { HotelsService } from './hotels.service';
import { City } from './entities/city.model';
import { HotelsController } from './hotels.controller';
import { JwtModule } from '@nestjs/jwt';
import { Region } from './entities/region.model';
import { Zone } from './entities/zone.model';
import { HotelGroup } from './entities/hotelGroup.model';


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