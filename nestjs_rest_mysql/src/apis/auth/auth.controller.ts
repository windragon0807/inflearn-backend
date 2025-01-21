import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService, //
  ) {}

  @Post('/login')
  login(
    @Body()
    { email, password }: { email: string; password: string },
  ): Promise<string> {
    return this.authService.login({ email, password });
  }
}
