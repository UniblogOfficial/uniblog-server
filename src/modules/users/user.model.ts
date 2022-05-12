import { UserRole } from '../roles/user-role.model';
import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Role } from '../roles/role.model';
import { Post } from '../posts/post.model';
import { Social } from '../socials/social.model';
import { Avatar } from './model/avatar.model';

interface UserCreationAttributes {
  name: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttributes> {
  @ApiProperty({ example: '69', description: 'Unique user ID' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'VasyaRaper', description: 'Unique(!) user name' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @ApiProperty({ example: 'vasyaraper@gmail.com', description: 'User email' })
  @Column({ type: DataType.STRING, unique: true, allowNull: true })
  email: string;

  @ApiProperty({ example: 'qwerty123', description: 'User password' })
  @Column({ type: DataType.STRING, allowNull: true })
  password: string;

  @ApiProperty({ example: 'false', description: 'Is email verified' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isVerified: boolean;

  // replace next two fields to separate table

  @ApiProperty({ example: 'false', description: 'Is banned' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean;

  @ApiProperty({ example: 'Reserved user name', description: 'Reason for blocking' })
  @Column({ type: DataType.STRING, allowNull: true })
  banReason: string;

  @HasOne(() => Avatar)
  avatar: Avatar;

  @HasMany(() => Social)
  socials: Social[];

  @HasMany(() => Post)
  posts: Post[];

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];
}
