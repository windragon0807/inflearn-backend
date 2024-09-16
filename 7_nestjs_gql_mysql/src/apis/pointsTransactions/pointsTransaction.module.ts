import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PointsTransactionResolver } from './pointsTransaction.resolver';
import { PointsTransactionService } from './pointsTransaction.service';
import { PointTransaction } from './entities/pointTransaction.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PointTransaction, //
      User,
    ]),
  ],
  providers: [
    PointsTransactionResolver, //
    PointsTransactionService,
  ],
})
export class PointsTransactionModule {}
