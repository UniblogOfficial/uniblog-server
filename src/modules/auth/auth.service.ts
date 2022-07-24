import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { UserService } from 'modules/users/user.service';

import { User } from 'modules/users/user.model';
import { LoginDto } from 'modules/auth/dto/login.dto';
import { CreateUserDto } from 'modules/users/dto/create-user.dto';
import { TUserTokenData } from 'modules/auth/types/index';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async register(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({ ...userDto, password: hashPassword });
    const token = this.generateToken(user);

    return { data: user, auth: { token }, message: 'User created' };
  }

  async me(userTokenData: TUserTokenData) {
    const user = await this.userService.getUserById(userTokenData.id);
    if (!user) {
      throw new HttpException('Token expired or such user not exists', HttpStatus.NOT_FOUND);
    }

    return { data: user };
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);
    const token = this.generateToken(user);
    return { data: user, auth: { token } };
  }

  generateToken(user: User) {
    const { id, email, roles } = user;

    const payload = { id, email, roles };
    const token = this.jwtService.sign(payload);

    return token;
  }

  private async validateUser(loginDto: LoginDto) {
    const user = await this.userService.getUserByEmail(loginDto.email);
    const isPasswordsEqual = await bcrypt.compare(loginDto.password, user.password);

    if (!user || !isPasswordsEqual) {
      throw new UnauthorizedException({ message: 'Invalid email/password' });
    }

    return user;
  }
}
