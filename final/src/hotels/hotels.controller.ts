import { Controller, Get, Post, Patch, Delete, Param, Body, Query, UseGuards, Request } from '@nestjs/common';
import { BlacklistGuard } from '../auth/blacklist.guard'; // Import BlacklistGuard
import { HotelsService } from './hotels.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Import this if you're implementing JWT authentication
import { CreateHotelDto } from './dto/create-hotel.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/roles.enum';
import { RolesGuard } from 'src/auth/roles.gurad';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}
    
  @Get()
  @UseGuards(JwtAuthGuard, BlacklistGuard) // Use this line if you want this route to be protected
  getAllHotels() {
    console.log('Getting all hotels');
    return this.hotelsService.findAll();
  }
  
  // @Get('nearby-offers')
  // getBestOffersFromNearbyHotels(
  //   @Query('airportId') airportId: string, // String to handle raw query param
  //   @Query('radius') radius: string,
  // ) {
  //   const airportIdNum = parseInt(airportId, 10);
  //   const radiusNum = parseInt(radius, 10);

  //   if (isNaN(airportIdNum) || isNaN(radiusNum)) {
  //     throw new Error('Invalid query parameters. Both airportId and radius must be numbers.');
  //   }

  //   return this.hotelsService.findBestOffersNearAirport(airportIdNum, radiusNum);
  // }
  @Get('nearby-offers')
  getBestOffersFromNearbyHotels(
    @Query('airportId') airportId: string, // String to handle raw query param
    @Query('radius') radius: string,
  ) {
    const airportIdNum = parseInt(airportId, 10);
    const radiusNum = parseInt(radius, 10);

    if (isNaN(airportIdNum) || isNaN(radiusNum)) {
      throw new Error('Invalid query parameters. Both airportId and radius must be numbers.');
    }

    const maxScore = 1000; // Example value for maxScore
    const p1 = 0.5; // Example value for p1
    const p2 = 0.5; // Example value for p2
    return this.hotelsService.findBestOffersNearAirport(airportIdNum, radiusNum, maxScore, p1, p2);
  }

  @Get(':name')
  getHotelByName(@Param('name') name: string) {
    return this.hotelsService.findOneByName(name);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard, BlacklistGuard)
  @Roles(Role.ADMINISTRATOR, Role.HOTEL_MANAGER, Role.GROUP_MANAGER, Role.DATA_OPERATOR)
  createHotel(@Body() createDto: CreateHotelDto) {
    return this.hotelsService.create(createDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMINISTRATOR, Role.HOTEL_MANAGER, Role.GROUP_MANAGER)
  updateHotel(@Param('id') id: number, @Body() updateDto: any, @Request() req) {
    const userId = req.user.sub;
    console.log('User ID:', userId);

    return this.hotelsService.update(id, updateDto, req.user, userId);
  }

  @Delete(':id')
  @Roles(Role.ADMINISTRATOR, Role.HOTEL_MANAGER, Role.GROUP_MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard, BlacklistGuard)
  deleteHotel(@Param('id') id: number, @Request() req) {
    const userId = req.user.sub;
    return this.hotelsService.remove(id, req.user, userId);
  }  
}
