import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common'

import { LoginDto } from './dto/login.dto'
import { AuthService } from './auth.service'


// restful
// method + URL(名词 有可读性且直指资源)

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}


  @Post('login')
  @HttpCode(HttpStatus.OK)  // 指定状态码为200
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}