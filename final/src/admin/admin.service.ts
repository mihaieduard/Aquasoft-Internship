import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/entities/user.entity';
@Injectable()
export class AdminService {
    constructor (
            // Inject the user service
            @InjectModel(User)
            private readonly userModel: typeof User,
        ) {}

    async getUsers(): Promise<User[]> {
        return this.userModel.findAll();
    }

    async findOneByFirstName(firstName: string): Promise<User> {
        return this.userModel.findOne({ where: { firstName } });
    }

    async update(id: number, updateDto: any): Promise<User> {
        const user = await this.userModel.findOne({ where: { id } });
        Object.assign(user, updateDto);
        return user.save();
    }

    async remove(id: number): Promise<void> {
        const user = await this.userModel.findOne({ where: { id } });
        await user.destroy();
    }
}
