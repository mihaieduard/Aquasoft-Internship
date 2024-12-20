// src/auth/token-cleanup.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { TokenBlacklist } from '../entities/token-blacklist.entity';

@Injectable()
export class TokenCleanupService {
    constructor(
        @InjectModel(TokenBlacklist)
        private readonly tokenBlacklistModel: typeof TokenBlacklist,
    ) {
        this.setupCleanupJob();
    }

    private setupCleanupJob() {
        setInterval(async () => {
            await this.tokenBlacklistModel.destroy({
                where: {
                    expiresAt: {
                        [Op.lt]: new Date()
                    }
                }
            });
        }, 24 * 60 * 60 * 1000); // Run once per day
    }
}