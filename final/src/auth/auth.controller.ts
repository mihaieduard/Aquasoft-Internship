// auth/auth.controller.ts
import { Controller, Post, Body, ValidationPipe, Get, UseGuards, Request, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Import this if you're implementing JWT authentication

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body(ValidationPipe) loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('register')
    async register(@Body(ValidationPipe) registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }
    @UseGuards(JwtAuthGuard)
    @Get('roles') 
    async getRoles() {
        return this.authService.getRoles();
    }

    @Post('logout')
    @UseGuards(JwtAuthGuard)
    async logout(@Headers('authorization') auth: string) {
    const token = auth.split(' ')[1];
    return this.authService.logout(token);
  }
}