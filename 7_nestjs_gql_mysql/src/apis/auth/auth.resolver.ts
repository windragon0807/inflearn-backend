import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { IContext } from 'src/common/interfaces/context';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { STRATEGY_REFRESHTOKEN_KEY } from 'src/common/constants/auth';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService, //
  ) {}

  @Mutation(() => String)
  async login(
    @Args('email') email: string, //
    @Args('password') password: string,
    @Context() context: IContext,
  ): Promise<string> {
    return this.authService.login({ email, password, context });
  }

  @UseGuards(GqlAuthGuard(STRATEGY_REFRESHTOKEN_KEY))
  @Mutation(() => String)
  restoreAccessToken(
    @Context() context: IContext, //
  ): string {
    return this.authService.restoreAccessToken({ user: context.req.user });
  }
}
