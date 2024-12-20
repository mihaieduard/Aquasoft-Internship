import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/entities/user.entity';
import { Hotel } from 'src/entities/hotel.entity';
import { Op } from 'sequelize';

@Injectable()
export class HotelManagerService {
    constructor(
        @InjectModel(User)
        private readonly userModel: typeof User,
        @InjectModel(Hotel)
        private readonly hotelModel: typeof Hotel,
    ) {}

    async findAll(): Promise<User[]> {
        const hotelManagers = await this.userModel.findAll({
            where: { RoleId: 1 }
        });
        return hotelManagers;
    }

    async findAllHotelsByUserEmail(userId: string): Promise<Hotel[]> {
        // First find the user by email
        const user = await this.userModel.findOne({
            where: { id: userId }
        });

        if (!user) {
            return [];
        }

        // Now use the user's role and ID to find the appropriate hotels
        switch (user.RoleId) {
            case 1: // Hotel Manager
                return this.findHotelsByManagerId(user.id);
            case 2: // Manager Group
                return this.findHotelsByManagerGroupId(user.id);
            default:
                return [];
        }
    }

    private async findHotelsByManagerId(userId: number): Promise<Hotel[]> {
        return this.hotelModel.findAll({
            where: {
                ManagerId: userId
            }
        });
    }

    private async findHotelsByManagerGroupId(userId: number): Promise<Hotel[]> {
        return this.hotelModel.findAll({
            where: {
                ManagerGroupId: userId
            }
        });
    }
}
