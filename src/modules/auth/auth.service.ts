import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

import { UserService } from 'modules/users/user.service';

import { LoginDto } from 'modules/auth/dto/login.dto';
import { CreateUserDto } from 'modules/users/dto/create-user.dto';
import { TUserTokenData } from 'modules/auth/types/index';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async register(userDto: CreateUserDto) {
    const candidate = await this.userService.getUser({ email: userDto.email });
    if (candidate) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({ ...userDto, password: hashPassword });
    const token = this.generateToken(user);

    return { data: user, auth: { token }, message: 'User created' };
  }

  async me({ id }: TUserTokenData) {
    return this.userService.getUser({ id });
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);
    const token = this.generateToken(user);
    return { data: user, auth: { token } };
  }

  generateToken(user: User) {
    const { id, email } = user;

    const payload = { id, email };
    const token = this.jwtService.sign(payload);

    return token;
  }

  private async validateUser({ email, password }: LoginDto) {
    const user = await this.userService.getUser({ email });
    const isPasswordsEqual = await bcrypt.compare(password, user.password);

    if (!user || !isPasswordsEqual) {
      throw new UnauthorizedException({ message: 'Invalid email/password' });
    }

    return user;
  }
}
