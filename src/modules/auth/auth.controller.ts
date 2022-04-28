import { CreateUserDto } from './../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { ValidationPipe } from 'src/core/pipes/validation.pipe';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @UsePipes(ValidationPipe)
  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }
}
