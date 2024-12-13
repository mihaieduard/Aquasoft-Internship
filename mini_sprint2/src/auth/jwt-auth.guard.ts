import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    // console.log('Request:', request.headers);
    const authHeader = request.headers.authorization;
    // console.log('Auth header:', authHeader);

    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token format is invalid');
    }

    try {
      const decodedToken = this.jwtService.verify(token, { secret: process.env.JWT_SECRET }); // Explicitly use the secret
      request.user = decodedToken;
      return true;
    } catch (error) {
      console.error('Token verification error:', error.message);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
