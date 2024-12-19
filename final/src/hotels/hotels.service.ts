import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript'; // Import Sequelize
import { Hotel } from '../entities/hotel.entity';
import { Airport } from '../entities/airports.entity';
import { PriceOffer } from '../entities/priceOffer.entity';

@Injectable()
export class HotelsService {
  constructor(
    @InjectModel(Hotel)
    private readonly hotelModel: typeof Hotel,
    private sequelize: Sequelize,  // Inject Sequelize instance here
  ) {}

  async findAll(): Promise<Hotel[]> {
    return this.hotelModel.findAll();
  }

  async findOneByName(hotelName: string): Promise<Hotel> {
    const hotel = await this.hotelModel.findOne({ where: { HotelName: hotelName } });
    if (!hotel) {
      throw new NotFoundException(`Hotel with name ${hotelName} not found`);
    }
    return hotel;
  }

  async create(createDto: any): Promise<Hotel> {
    return this.hotelModel.create(createDto);
  }

  async update(id: number, updateDto: any): Promise<[number, Hotel[]]> {
    return this.hotelModel.update(updateDto, {
      where: { HotelID: id },
      returning: true,
    });
  }

  async remove(id: number): Promise<void> {
    const result = await this.hotelModel.destroy({ where: { HotelID: id } });
    if (result === 0) {
      throw new NotFoundException(`Hotel with ID ${id} not found`);
    }
  }

  async findBestOffersNearAirport(airportId: number, radius: number, maxScore: number, p1: number = 0.5, p2: number = 0.5): Promise<any> {
    // Fetch the airport details (latitude and longitude)
    const airport = await this.getAirportById(airportId);
    if (!airport) {
      throw new NotFoundException(`Airport with ID ${airportId} not found`);
    }
  
    // Query hotels within the radius using the Haversine formula
    const hotels = await this.hotelModel.findAll({
      include: [
        {
          model: PriceOffer,
          required: true, // Only include hotels with offers
        },
      ],
      where: this.sequelize.literal(`
        (6371 * acos(cos(radians(${airport.Latitude})) * cos(radians(Hotel.Latitude)) * cos(radians(Hotel.Longitude) - radians(${airport.Longitude})) + sin(radians(${airport.Latitude})) * sin(radians(Hotel.Latitude)))) <= ${radius}
      `),
    });
  
    // Map and filter hotels based on the computed score
    const filteredHotels = hotels
      .map(hotel => {
        const distance = this.calculateDistance(
          airport.Latitude,
          airport.Longitude,
          hotel.Latitude,
          hotel.Longitude,
        );
  
        const offers = hotel.PriceOffers.map(offer => ({
          offerId: offer.OfferID,
          price: offer.Price,
          priceCategory: offer.PriceCategory,
          score: distance * p1 + offer.Price * p2, // Calculate the score
        }));
  
        return {
          hotelId: hotel.HotelID,
          hotelName: hotel.HotelName,
          offers: offers.filter(offer => offer.score <= maxScore), // Filter offers by score
          distance,
        };
      })
      .filter(hotel => hotel.offers.length > 0); // Include only hotels with valid offers
  
    return filteredHotels;
  }
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;  // Radius of Earth in km
    const dLat = this.degreesToRadians(lat2 - lat1);
    const dLon = this.degreesToRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.degreesToRadians(lat1)) * Math.cos(this.degreesToRadians(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;  // Distance in km
  }

  private degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  private async getAirportById(id: number): Promise<any> {
    // Fetch airport data (latitude, longitude) based on airportId
    // Assuming you have an Airport model
    
    return await Airport.findOne({ where: { ID: id } });
  }
  
}
