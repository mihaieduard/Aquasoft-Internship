import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { User } from '../entities/user.entity';
import { Role } from '../entities/roles.entity';
import { AuthController } from './auth.controller';
import { TokenBlacklist } from '../entities/token-blacklist.entity';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { RolesGuard } from './roles.gurad';
import { TokenCleanupService } from './token-clenup.service'; // Add this line
import { BlacklistGuard } from './blacklist.guard'; // Add this line

@Module({
  imports: [
      PassportModule,
      JwtModule.registerAsync({
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET'),
            signOptions: { expiresIn: '1h' },
        }),
    }),
      SequelizeModule.forFeature([User, Role, TokenBlacklist]),
  ],
  controllers: [AuthController],
  providers: [
      AuthService, 
      JwtStrategy, 
      RolesGuard,
      TokenCleanupService,  // Add this line
      BlacklistGuard  
  ],
  exports: [AuthService],
})
export class AuthModule {}


// @Module({
//   imports: [
//       PassportModule,
//       JwtModule.registerAsync({
//           inject: [ConfigService],
//           useFactory: async (configService: ConfigService) => ({
//               secret: configService.get<string>('JWT_SECRET'),
//               signOptions: { expiresIn: '1h' },
//           }),
//       }),
//       SequelizeModule.forFeature([User, Role, TokenBlacklist]),
//   ],
//   controllers: [AuthController],
//   providers: [AuthService, JwtStrategy, RolesGuard],
//   exports: [AuthService],
// })
// export class AuthModule {}