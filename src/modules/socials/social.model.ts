import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from '../users/user.model';

interface SocialCreationAttrs {
  name: string;
  accessToken: string;
  socialUserId: string;
  userId: number;
}

@Table({ tableName: 'socials' })
export class Social extends Model<Social, SocialCreationAttrs> {
  @ApiProperty({ example: '69', description: 'Unique social network ID' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'vk', description: 'Social network name' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: '10204223', description: 'Social network user ID' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  socialUserId: string;

  @ApiProperty({ example: '3ff3fwfs4Wvy', description: 'Social network access token' })
  @Column({ type: DataType.STRING })
  accessToken: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
