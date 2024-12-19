import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UserService {
    constructor (
        // Inject the user service
        @InjectModel(User)
        private readonly userModel: typeof User,
    ) {}

    async getUsers(): Promise<User[]> {
        return this.userModel.findAll();
    }
}
