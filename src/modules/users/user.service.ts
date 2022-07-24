import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { RoleService } from 'modules/roles/role.service';

import { CreateUserDto } from 'modules/users/dto/create-user.dto';
import { BanUserDto } from 'modules/users/dto/ban-user.dto';
import { AddRoleDto } from 'modules/users/dto/add-role.dto';
import { Avatar } from 'modules/users/model/avatar.model';
import { User } from 'modules/users/user.model';
import { TUserAvatarFormData } from 'modules/files/file.service';
import { TUserTokenData } from 'modules/auth/types/index';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Avatar) private avatarRepository: typeof Avatar,
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

  async updateAvatar(userTokenData: TUserTokenData, image: TUserAvatarFormData) {
    try {
      const { id } = await this.userRepository.findByPk(userTokenData.id);
      let avatar = await this.avatarRepository.findOne({ where: { userId: id } });

      const avatarData = {
        userId: id,
        imageType: image.avatar[0].mimetype,
        imageData: image.avatar[0].buffer,
      };

      if (!avatar) {
        avatar = await this.avatarRepository.create(avatarData);
      } else {
        await this.avatarRepository.update(avatarData, {
          where: { userId: id },
          returning: true,
        });
      }

      const user = await this.getUserById(id);

      return { data: user, message: 'Avatar updated' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    if (!role) throw new HttpException('Role not found', HttpStatus.NOT_FOUND);

    await user.$add('role', role.id);

    return dto;
  }

  async ban(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    user.banned = true;
    user.banReason = dto.banReason;

    await user.save();

    return user;
  }

  getAllUsers() {
    return this.userRepository.findAll({ include: { all: true } });
  }

  getUserById(id: number) {
    return this.userRepository.findOne({ where: { id }, include: { all: true } });
  }

  getUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email }, include: { all: true } });
  }

  getUserByName(name: string) {
    return this.userRepository.findOne({ where: { name }, include: { all: true } });
  }
}
