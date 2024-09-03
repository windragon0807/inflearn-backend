import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from '../users/user.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, //
    private readonly userService: UserService,
  ) {}

  getAccessToken({ user }: { user: User }): string {
    return this.jwtService.sign(
      { sub: user.id },
      { secret: '나의비밀번호', expiresIn: '1h' },
    );
  }

  async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<string> {
    /* 이메일이 유효한 지 확인 */
    const user = await this.userService.findOneByEmail({ email });
    if (!user) throw new UnprocessableEntityException('이메일이 없습니다.');

    /* 비밀번호가 유효한 지 확인 */
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth)
      throw new UnprocessableEntityException('비밀번호가 틀렸습니다.');

    /* JWT 토큰 발급 */
    return this.getAccessToken({ user });
  }
}
