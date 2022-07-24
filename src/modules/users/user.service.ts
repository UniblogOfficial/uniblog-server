import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaService } from 'modules/prisma/prisma.service';
import { RoleService } from 'modules/roles/role.service';

import { CreateUserDto } from 'modules/users/dto/create-user.dto';
import { BanUserDto } from 'modules/users/dto/ban-user.dto';
import { AddRoleDto } from 'modules/users/dto/add-role.dto';
import { TUserAvatarFormData } from 'modules/files/file.service';
import { TUserTokenData } from 'modules/auth/types/index';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private roleService: RoleService) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    try {
      const [user, role] = await this.prisma.$transaction([
        this.prisma.user.create({ data: dto }),
        this.prisma.role.findUnique({ where: { value: 'user' } }),
      ]);

      await this.prisma.userRole.create({
        data: { userId: user.id, roleId: role.id },
      });

      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateAvatar(userTokenData: TUserTokenData, image: TUserAvatarFormData) {
    try {
      const { id } = await this.prisma.user.findUnique({
        where: { id: userTokenData.id },
        select: { id: true },
      });
      const avatar = await this.prisma.avatar.findFirst({
        where: { userId: id },
        select: { id: true },
      });

      const avatarData = {
        imageType: image.avatar[0].mimetype,
        imageData: image.avatar[0].buffer,
      };

      if (!avatar) {
        await this.prisma.avatar.create({ data: { ...avatarData, userId: id } });
      } else {
        await this.prisma.avatar.update({
          where: { id: avatar.id },
          data: avatarData,
        });
      }

      return this.prisma.user.findUnique({ where: { id } });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async addRole({ userId, value }: AddRoleDto) {
    const [user, role] = await this.prisma.$transaction([
      this.prisma.user.findUnique({ where: { id: userId }, select: { id: true } }),
      this.prisma.role.findUnique({ where: { value }, select: { id: true } }),
    ]);

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    if (!role) throw new HttpException('Role not found', HttpStatus.NOT_FOUND);

    return this.prisma.userRole.create({
      data: { userId: user.id, roleId: role.id },
    });
  }

  async ban({ userId, banReason }: BanUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return this.prisma.user.update({ where: { id: userId }, data: { banned: true, banReason } });
  }

  getAllUsers() {
    return this.prisma.user.findMany();
  }

  getUserById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  getUserByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  getUserByName(name: string) {
    return this.prisma.user.findUnique({ where: { name } });
  }
}
