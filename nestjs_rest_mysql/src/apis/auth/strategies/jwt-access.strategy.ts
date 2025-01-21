import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { STRATEGY_ACCESSTOKEN_KEY } from '@common/constants/auth';
import { UserContext } from '@common/interfaces';

export class JwtAccessStrategy extends PassportStrategy(
  Strategy /* 인가를 처리할 방식 */,
  STRATEGY_ACCESSTOKEN_KEY /* 나만의 인증 방식 이름 */,
) {
  constructor() {
    /* 부모클래스의 생성자 함수 내에는 유효한 토큰인지, 토큰 만료시간이 남았는지 등을 파악하는 검증 로직이 들어있습니다. */
    super({
      /* 프론트로부터 받은 요청 내 헤더에 존재하는 jwt token을 추출해줍니다. */
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 직접 로직을 작성할 수도 있습니다.
      // jwtFromRequest: (req) => {
      //   const temp = req.headers.Authorization; // Bearer sdaklfjqlkwjfkljas
      //   const accessToken = temp.toLowercase().replace('bearer ', '');
      //   return accessToken;
      // },
      secretOrKey: process.env.ACCESSTOKEN_SECRET,
    });
  }

  /**
   * 인가에 성공했을 때 실행되며, 사용자의 정보를 반환해주는 로직을 포함합니다.
   * fetchUser API로 리턴되는 것이 아니며, `context` 안의 `req`에 `user`라는 이름으로
   * `email`과 `id` 정보가 담긴 객체를 `user` 안으로 return 되는 것이다.
   * (`passport`에서 `user`를 자동으로 만들어주기 때문에 바꿀 수 없습니다.)
   */
  validate(
    payload: UserContext & {
      iat: number;
      exp: number;
    },
  ) {
    console.log('================');
    console.log('Payload');
    console.log(payload);
    console.log('================');

    return {
      id: payload.id,
      email: payload.email,
    };
  }
}
