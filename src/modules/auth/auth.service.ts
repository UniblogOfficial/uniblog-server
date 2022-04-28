import * as bcrypt from 'bcryptjs';
import { UserService } from '../users/user.service';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.model';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

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
    return { data: user, auth: { token } };
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);
    const token = this.generateToken(user);
    return { data: user, auth: { token } };
  }

  generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    const token = this.jwtService.sign(payload);
    return token;
  }

  private async validateUser(loginDto: LoginDto) {
    const user = await this.userService.getUserByEmail(loginDto.email);
    const isPasswordsEqual = await bcrypt.compare(loginDto.password, user.password);
    if (user && isPasswordsEqual) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Invalid email/password' });
  }
}
