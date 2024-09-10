import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';

import { STRATEGY_REFRESHTOKEN_KEY } from 'src/common/constants/auth';

export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  STRATEGY_REFRESHTOKEN_KEY,
) {
  constructor() {
    super({
      jwtFromRequest: (req: Request) => {
        console.log('ryong', req.headers);
        const cookie = req.headers.cookie; // refreshToken=asdlkfjqlkjwfdjkl
        // 다른 쿠키값도 같이 올 수 있으므로 대비가 필요
        const refreshToken = cookie.replace('refreshToken=', '');
        return refreshToken;
      },
      secretOrKey: process.env.REFRESHTOKEN_SECRET,
    });
  }

  validate(payload) {
    console.log(payload); // { sub: asdkljfkdj(유저ID) }

    return {
      id: payload.sub,
    };
  }
}
