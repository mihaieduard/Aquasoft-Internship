import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { Hotel } from './hotels/entities/hotel.model';
import { PriceOffer } from './hotels/entities/priceOffer.model';
import { HotelsModule } from './hotels/hotels.module'; // Add this import
import { Airport } from './hotels/entities/airports.model'; // Add this import
import { Region } from './hotels/entities/region.model'; // Add this import
import { City } from './hotels/entities/city.model'; // Add this import
import { HotelGroup } from './hotels/entities/hotelGroup.model'; // Add this import
import { Zone } from './hotels/entities/zone.model'; // Add this import
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '458900',
      database: 'hoteldb',
      models: [Hotel, PriceOffer, Airport, Region, City, HotelGroup, Zone],
      autoLoadModels: true,
      synchronize: true,
    }),
    HotelsModule, // Add this line
    AuthModule,
  ],
})
export class AppModule {}