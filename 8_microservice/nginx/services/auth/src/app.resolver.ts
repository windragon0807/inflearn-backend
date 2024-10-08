import { Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  // constructor(private readonly appService) {}
  @Mutation(() => String)
  login() {
    return 'accessToken';
  }

  @Query(() => String)
  aaa() {
    return 'aaa';
  }
}
