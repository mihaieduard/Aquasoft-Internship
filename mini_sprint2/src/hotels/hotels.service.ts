import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Hotel } from './entities/hotel.model';

@Injectable()
export class HotelsService {
  constructor(
    @InjectModel(Hotel)
    private readonly hotelModel: typeof Hotel,
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
}
