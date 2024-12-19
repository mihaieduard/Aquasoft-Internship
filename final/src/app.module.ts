import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './entities/user.entity';
import { HotelsModule } from './hotels/hotels.module';
import { Role } from './entities/roles.entity';
import { Airport } from './entities/airports.entity';
import { PriceOffer } from './entities/priceOffer.entity';
import { City } from './entities/cities.entity';
import { Hotel } from './entities/hotel.entity';
import { HotelGroup } from './entities/hotelGroup.entity';
import { Region } from './entities/region.entity';
import { Zone } from './entities/zone.entity';
@Module({
  imports: [
    ConfigModule.forRoot(), // Add this
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '458900',
      database: 'hotels',
      autoLoadModels: true,
      synchronize: true,
      models: [User, Role, Airport, PriceOffer, City, Hotel, HotelGroup, Region, Zone],
    }),
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config available throughout the app
    }),

    UserModule,
    AuthModule,
    HotelsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
