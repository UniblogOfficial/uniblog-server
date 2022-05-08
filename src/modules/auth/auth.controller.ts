import { CreateUserDto } from './../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, Req, UseGuards, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { ValidationPipe } from 'src/core/pipes/validation.pipe';
import { User } from '../users/user.model';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Initial user authentication' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() request) {
    return this.authService.me(request.user);
  }

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
