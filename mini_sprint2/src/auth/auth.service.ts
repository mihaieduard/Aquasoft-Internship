import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(payload: any): Promise<string> {
    // console.log('Payload:', payload);
    // console.log('Secret:', process.env.JWT_SECRET);
    // console.log('return', this.jwtService.sign(payload, { secret: process.env.JWT_SECRET }));
    return this.jwtService.sign(payload, { secret: process.env.JWT_SECRET }); // Explicitly use the secret
  }
}
