import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { STRATEGY_KEY } from 'src/common/constants/auth';

/**
 * PassportStrategy(인가를 처리할 방식, 나만의 인증 방식 이름)
 * - 해당 secret 키가 맞는지 복호화를 시도해보며, 만료기간이 남았는지 등을 확인합니다.
 */
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  STRATEGY_KEY,
) {
  constructor() {
    super({
      // 직접 로직을 작성할 수도 있습니다.
      // jwtFromRequest: (req) => {
      //   const temp = req.headers.Authorization; // Bearer sdaklfjqlkwjfkljas
      //   const accessToken = temp.toLowercase().replace('bearer ', '');
      //   return accessToken;
      // },
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESSTOKEN_SECRET,
    });
  }

  /**
   * 인가에 성공했을 때 실행되며, 사용자의 정보를 반환해주는 로직을 포함합니다.
   * fetchUser API로 리턴되는 것이 아니며, `context` 안의 `req`에 `user`라는 이름으로
   * `email`과 `id` 정보가 담긴 객체를 `user` 안으로 return 되는 것이다.
   * (`passport`에서 `user`를 자동으로 만들어주기 때문에 바꿀 수 없습니다.)
   */
  validate(payload) {
    console.log(payload); // { sub: askljdfklj-128930djk }
    return {
      id: payload.sub,
    };
  }
}
