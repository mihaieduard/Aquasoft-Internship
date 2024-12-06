import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Import this if you're implementing JWT authentication

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}
    
  @Get()
  @UseGuards(JwtAuthGuard) // Use this line if you want this route to be protected
  getAllHotels() {
    return this.hotelsService.findAll();
  }

  @Get(':name')
  getHotelByName(@Param('name') name: string) {
    return this.hotelsService.findOneByName(name);
  }

  @Post()
  @UseGuards(JwtAuthGuard) // Use this line if you want this route to be protected
  createHotel(@Body() createDto: any) {
    return this.hotelsService.create(createDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  updateHotel(@Param('id') id: number, @Body() updateDto: any) {
    return this.hotelsService.update(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteHotel(@Param('id') id: number) {
    return this.hotelsService.remove(id);
  }
}
