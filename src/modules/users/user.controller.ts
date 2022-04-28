import { ValidationPipe } from './../../core/pipes/validation.pipe';
import { BanUserDto } from './dto/ban-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { RolesGuard } from './../auth/roles.guard';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Body, Controller, Get, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.model';
import { Roles } from '../auth/roles-auth.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'User creation' })
  @ApiResponse({ status: 200, type: User })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: 'All users fetching' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get('all')
  getAll() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Add role to user' })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Put('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.userService.addRole(dto);
  }

  @ApiOperation({ summary: 'Ban user' })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Put('/ban')
  ban(@Body() dto: BanUserDto) {
    return this.userService.ban(dto);
  }
}
