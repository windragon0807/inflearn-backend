import { Catch, ExceptionFilter, HttpException } from '@nestjs/common';

/**
 * @Catch(HttpException): 에러 관련된 내용이 들어가 있음을 NestJS 에게 알려주기 위한 데코레이터
 * Exception 상황 발생 시 비즈니스 로직에 try/catch 문이 없더라도 자동으로 에러가 catch 문으로 들어옵니다.
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException) {
    const status = exception.getStatus();
    const message = exception.message;

    console.log('===========================');
    console.log('예외가 발생했어요!!');
    console.log('예외내용:', message);
    console.log('예외코드:', status);
    console.log('===========================');
  }
}
