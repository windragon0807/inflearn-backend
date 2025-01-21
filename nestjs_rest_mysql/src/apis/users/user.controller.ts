import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { STRATEGY_ACCESSTOKEN_KEY } from '@common/constants/auth';
import { Context } from '@common/interfaces';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(
    private readonly userService: UserService, //
  ) {}

  /**
   * 1. 프론트에서 fetchUser API를 요청합니다.
   * 2. Get(fetchUser)를 실행하기전에 먼저 'STRATEGY_ACCESSTOKEN_KEY' 검증을 실행 합니다.
   * 3. strategy 파일에서 'STRATEGY_ACCESSTOKEN_KEY' 이름을 가진 검증 로직을 찾습니다.
   * 4. 해당 검증 로직을 찾아 super을 통해 JWT 옵션값들이 `PassportStrtegy` 로 넘겨져 jwt 토큰 방식으로 검증을 시작 합니다.
   * 5. 검증이 완료되면 토큰을 복호화되었을때 나오는 id값을 payload 형태로 받을 수 있습니다.
   *    검증이 완료되지 않으면 프론트로 에러가 반환됩니다.
   *    따라서, 검증에서 통과가 되면 fetchUser API가 실행 되고, 통과되지 않으면 API가 실행되지 않습니다.
   */
  @UseGuards(AuthGuard(STRATEGY_ACCESSTOKEN_KEY))
  @Get()
  fetchUser(@Req() req: Context): string {
    // 유저 정보 꺼내오기
    console.log('================');
    console.log('Request Context');
    console.log({ id: req.user.id, email: req.user.email });
    console.log('================');

    return '인가에 성공하였습니다.';
  }

  @Post()
  createUser(
    @Body()
    {
      email,
      password,
      name,
      age,
    }: {
      email: string;
      password: string;
      name: string;
      age: number;
    },
  ): Promise<User> {
    return this.userService.create({ email, password, name, age });
  }
}
