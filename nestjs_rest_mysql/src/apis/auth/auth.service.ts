import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../users/user.service';
import { User } from '../users/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, //
    private readonly userService: UserService,
  ) {}

  async login({ email, password }: { email: string; password: string }) {
    const user = await this.userService.findOneByEmail({ email });

    /* 이메일이 유효한 지 확인 */
    if (!user) throw new UnprocessableEntityException('이메일이 없습니다.');

    /* 비밀번호가 유효한 지 확인 */
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth)
      throw new UnprocessableEntityException('비밀번호가 틀렸습니다.');

    return this.getAccessToken({ user });
  }

  getAccessToken({ user }: { user: User }): string {
    /**
     * JwtService에 sign 메서드를 사용해 토큰 발급이 가능합니다.
     * jwt.sign(json data, secretKey, [options, callback])
     *   `json data` : 유저의 정보가 담긴 payload를 의미
     *   `sercretKey` : 서명된 JWT를 생성할 때 사용하는 키(암호화와 복호화에서 사용되는 키)
     *   `option` :  해싱 알고리즘(기본적으로 HS256 해싱 알고리즘을 사용), 토큰 유효기간 및 발행자 지정 가능
     */
    return this.jwtService.sign(
      { id: user.id, email: user.email },
      { secret: process.env.ACCESSTOKEN_SECRET, expiresIn: '1h' },
    );
  }
}
