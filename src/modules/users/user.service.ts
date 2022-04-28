import { BanUserDto } from './dto/ban-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { RoleService } from '../roles/role.service';
import { User } from './user.model';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RoleService,
  ) {}

  async createUser(dto: CreateUserDto) {
    try {
      const user = await this.userRepository.create(dto);
      const role = await this.roleService.getRoleByValue('USER');
      await user.$set('roles', [role.id]);
      user.roles = [role];
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (user && role) {
      await user.$add('role', role.id);
      return dto;
    }
    throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
  }

  async ban(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    user.banned = true;
    user.banReason = dto.banReason;
    await user.save();
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email }, include: { all: true } });
    return user;
  }

  async getUserByName(name: string) {
    const user = await this.userRepository.findOne({ where: { name }, include: { all: true } });
    return user;
  }

  async getUserByVkUserId(userId: string) {
    const user = await this.userRepository.findOne({
      where: { vk_id: userId },
      include: { all: true },
    });
    return user;
  }
}
