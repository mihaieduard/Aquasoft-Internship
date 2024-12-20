import {
  Controller,
  Get,
  UseGuards,
  Param,
  Put,
  Body,
  Delete,
  Request,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Import this if you're implementing JWT authentication
import { BlacklistGuard } from '../auth/blacklist.guard'; // Import BlacklistGuard
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/roles.enum';
import { RolesGuard } from 'src/auth/roles.gurad';

@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  @UseGuards(JwtAuthGuard, BlacklistGuard, RolesGuard)
  @Roles(Role.ADMINISTRATOR)
  async getAdmins() {
    console.log('Getting all admins');
    return this.adminService.getUsers();
  }

  @Get(':firstname')
  @UseGuards(JwtAuthGuard, BlacklistGuard, RolesGuard)
  @Roles(Role.ADMINISTRATOR)
  getHotelByFirstName(@Param('firstname') firstname: string, @Request() req) {
    return this.adminService.findOneByFirstName(firstname);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, BlacklistGuard, RolesGuard)
  @Roles(Role.ADMINISTRATOR)
  updateHotel(@Param('id') id: number, @Body() updateDto: any) {
    return this.adminService.update(id, updateDto);
  }

  @Delete(':id')
  @Roles(Role.ADMINISTRATOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  deleteHotel(@Param('id') id: number) {
    return this.adminService.remove(id);
  }
}
