import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '../users/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';

@Module({
  imports: [
    JwtModule.register({}), //
    UserModule,
  ],
  providers: [
    JwtAccessStrategy, //
    AuthResolver,
    AuthService,
  ],
})
export class AuthModule {}
