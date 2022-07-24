import { Body, Controller, Get, Post, Req, UseGuards, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';

import { AuthService } from 'modules/auth/auth.service';

import { ApiKeyGuard } from 'modules/auth/guards/api-key.guard';
import { JwtAuthGuard } from 'modules/auth/guards/jwt-auth.guard';

import { CreateUserDto } from 'modules/users/dto/create-user.dto';
import { LoginDto } from 'modules/auth/dto/login.dto';

import { ValidationPipe } from 'core/pipes/validation.pipe';

@ApiTags('Auth')
@ApiSecurity('API-KEY', ['API-KEY'])
@UseGuards(ApiKeyGuard)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Initial user authentication' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() request: any): Promise<User> {
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
