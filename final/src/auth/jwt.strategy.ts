import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        private authService: AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET'),
            passReqToCallback: true,
        });
    }

    async validate(req: Request, payload: any) {
        const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        
        // Check if token is blacklisted
        const isBlacklisted = await this.authService.isTokenBlacklisted(token);
        if (isBlacklisted) {
            throw new UnauthorizedException('Token has been revoked');
        }
    
        return {
            id: payload.sub,           // Change userId to id to match what service expects
            email: payload.email,
            role: payload.role,
            RoleId: payload.RoleId
        };
    }
}