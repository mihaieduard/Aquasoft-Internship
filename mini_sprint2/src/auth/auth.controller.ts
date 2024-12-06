import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    // In a real app, validate the username and password here
    const payload = { username: body.username, sub: 1 }; // Adjust as needed
    const token = await this.authService.generateToken(payload);
    return { access_token: token };
  }
}
