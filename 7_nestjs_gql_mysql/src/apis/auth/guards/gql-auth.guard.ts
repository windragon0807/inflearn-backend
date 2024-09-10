import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

import { STRATEGY_KEY } from 'src/common/constants/auth';

/**
 * GraphQL에서 guard를 사용하기 위해서는 한 단계 더 거쳐야 합니다.
 * 즉, GraphQL에서는 @UseGuards(AuthGuard('access'))를 사용할 수 없습니다.
 * AuthGuard를 바로 실행하는 것이 아니라 GqlAuthAccessGuard를 먼저 실행시켜서 통과되면 AuthGuard를 실행시키는 것입니다.
 */
export class GqlAuthAccessGuard extends AuthGuard(STRATEGY_KEY) {
  /**
   * AuthGuard 내에 존재하는 getRequest 검증 함수를 사용하여 rest-api 용도의 함수를 graphql 용도의 함수로 바꿔줍니다 (= overriding).
   * - context : request 요청에 포함된 Headers 등의 내용들이 담겨져 있습니다.
   * - GqlExecutionContext.create(context) : rest-api 용으로 들어오는 context 이기에 GraphQL용 context로 다시 만들어 줍니다.
   * - getContext() : GraphQL용 context를 가지고 와서 안에 들어있는 req 정보만 뽑아줍니다.
   */
  getRequest(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context);
    return gqlContext.getContext().req;
  }
}
