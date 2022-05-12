import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from '../user.model';

interface AvatarCreationAttributes {
  userId: number;
  imageType: string;
  imageData: Buffer;
}

@Table({ tableName: 'avatars' })
export class Avatar extends Model<Avatar, AvatarCreationAttributes> {
  @ApiProperty({ example: '69', description: 'Unique avatar ID' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'image/png', description: 'Image mime type' })
  @Column({ type: DataType.STRING })
  imageType: string;

  @ApiProperty({
    example: '<A HUGE STRING OF RANDOM CHARS REPRESENTING IMAGE>',
    description: 'Image data',
  })
  @Column({ type: DataType.BLOB('long') })
  imageData: Buffer;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
