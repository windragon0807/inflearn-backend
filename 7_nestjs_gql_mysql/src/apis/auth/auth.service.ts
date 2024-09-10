import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from '../users/user.service';
import { User } from '../users/entities/user.entity';
import { IAuthUser, IContext } from 'src/common/interfaces/context';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, //
    private readonly userService: UserService,
  ) {}

  async login({
    email,
    password,
    context,
  }: {
    email: string;
    password: string;
    context: IContext;
  }): Promise<string> {
    /* 이메일이 유효한 지 확인 */
    const user = await this.userService.findOneByEmail({ email });
    if (!user) throw new UnprocessableEntityException('이메일이 없습니다.');

    /* 비밀번호가 유효한 지 확인 */
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth)
      throw new UnprocessableEntityException('비밀번호가 틀렸습니다.');

    /* refreshToken(JWT)을 만들어서 브라우저 쿠키에 저장해서 보내주기 */
    this.setRefreshToken({ user, context });

    /* JWT 토큰 발급 */
    return this.getAccessToken({ user });

    /** refreshToken은 cookie를 통해 받게 되고, accessToken은 payload를 통해 받게 됩니다. */
  }

  restoreAccessToken({ user }: { user: IAuthUser['user'] }): string {
    return this.getAccessToken({ user });
  }

  setRefreshToken({ user, context }: { user: User; context: IContext }): void {
    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      { secret: process.env.REFRESHTOKEN_SECRET, expiresIn: '2w' },
    );

    // 개발환경
    context.res.setHeader(
      'set-Cookie',
      `refreshToken=${refreshToken}; path=/;`,
    );

    // 배포환경
    // context.res.setHeader('set-Cookie', `refreshToken=${refreshToken}; path=/; domain=.mybacksite.com; SameSite=None; Secure; httpOnly`);
    // context.res.setHeader('Access-Control-Allow-Origin', 'https://myfrontsite.com');
  }

  getAccessToken({ user }: { user: User | IAuthUser['user'] }): string {
    return this.jwtService.sign(
      { sub: user.id },
      { secret: process.env.ACCESSTOKEN_SECRET, expiresIn: '1h' },
    );
  }
}
