import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HotelsModule } from './hotels/hotels.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root', // replace with your MySQL username
      password: '458900', // replace with your MySQL password
      database: 'HotelDB',
      autoLoadModels: true,
      synchronize: true,
    }),
    AuthModule,
    HotelsModule,
  ],
})
export class AppModule {}
