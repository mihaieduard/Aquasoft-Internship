import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Import this if you're implementing JWT authentication
import { CreateHotelDto } from './dto/create-hotel.dto';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}
    
  @Get()
  // @UseGuards(JwtAuthGuard) // Use this line if you want this route to be protected
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
  @UseGuards(JwtAuthGuard)
  createHotel(@Body() createDto: CreateHotelDto) {
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
