import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Resolver } from '@nestjs/graphql';

import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { PointTransaction } from './entities/pointTransaction.entity';
import { PointsTransactionService } from './pointsTransaction.service';
import { STRATEGY_REFRESHTOKEN_KEY } from 'src/common/constants/auth';
import { IContext } from 'src/common/interfaces/context';

@Resolver()
export class PointsTransactionResolver {
  constructor(
    private readonly pointsTransactionService: PointsTransactionService,
  ) {}

  @UseGuards(GqlAuthGuard(STRATEGY_REFRESHTOKEN_KEY))
  @Mutation(() => PointTransaction)
  createPointTransaction(
    @Args('impUid') impUid: string,
    @Args({ name: 'amount', type: () => Int }) amount: number,
    @Context() context: IContext,
  ): Promise<PointTransaction> {
    const user = context.req.user;
    return this.pointsTransactionService.create({ impUid, amount, user });
  }
}
