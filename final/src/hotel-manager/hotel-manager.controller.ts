import { Controller, Get, Request } from '@nestjs/common';
import { HotelManagerService } from './hotel-manager.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/roles.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/roles.gurad';
import { BlacklistGuard } from '../auth/blacklist.guard';

@Controller('hotel-manager')
export class HotelManagerController {
    constructor(private readonly hotelManagerService: HotelManagerService) {}

    @Get()
    getAllHotelManagers() {
        console.log('Getting all hotel managers');
        return this.hotelManagerService.findAll();
    }

    @Get('hotels')
    @UseGuards(JwtAuthGuard, BlacklistGuard, RolesGuard)
    @Roles(Role.HOTEL_MANAGER, Role.GROUP_MANAGER)
    async getHotels(@Request() req) {
        // First, find the user by email from the token
        const userId = req.user.sub;
        console.log('Getting hotels for user with email:', userId);
        return this.hotelManagerService.findAllHotelsByUserEmail(userId);
    }
}
