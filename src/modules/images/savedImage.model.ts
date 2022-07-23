import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';

import { User } from 'modules/users/user.model';
import { MLContentType } from 'modules/multilinks/model/multilink.model';

interface ISavedImageCreationAttrs {
  userId: number;
  type: MLContentType | 'backgroundImage';
  filename: string; // 'logo-front.png';
  name: string; // 'logo-front';
  mime: string; // 'image/png';
  extension: string; // 'png';
  url: string; // 'https://i.ibb.co/VMKgkB6/logo-front.png';
  thumbUrl: string;
}

@Table({ tableName: 'SavedImages' })
export class SavedImage
  extends Model<SavedImage, ISavedImageCreationAttrs>
  implements ISavedImageCreationAttrs
{
  @ApiProperty({ example: '69', description: 'Unique Image ID' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  type: MLContentType | 'backgroundImage';

  @ApiProperty({ example: '0_logo_1', description: 'Image name' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: '0_logo_1.png', description: 'Image name' })
  @Column({ type: DataType.STRING, allowNull: false })
  filename: string;

  @ApiProperty({ example: 'image/png', description: 'Image mime type' })
  @Column({ type: DataType.STRING, allowNull: false })
  mime: string;

  @ApiProperty({ example: 'png', description: 'Image extension' })
  @Column({ type: DataType.STRING, allowNull: false })
  extension: string;

  @ApiProperty({
    example: 'https://i.ibb.co/VMKgkB6/logo-front.png',
    description: 'Image source url',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  url: string;

  @ApiProperty({
    example: 'https://i.ibb.co/VMKgkB6/logo-front.png',
    description: 'Image thumb url',
  })
  @Column({ type: DataType.STRING })
  thumbUrl: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
