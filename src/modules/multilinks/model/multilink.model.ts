import { MLImageData } from './images/ml-imagedata.model';
import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../users/user.model';
import { MLLogo } from './ml-logo.model';
import { MLLink } from './ml-link.model';
import { MLSocial } from './ml-social.model';
import { MLText } from './ml-text.model';
import { MLVideo } from './ml-video.model';
import { MLImage } from './ml-image.model';
import { MLImageText } from './ml-imagetext.model';
import { MLShop } from './ml-shop.model';

interface MultilinkCreationAttributes {
  name: string;
  background: string;
  contentSet: MLContentType[];
  userId: number;
}

export enum MLContentType {
  TEXT = 'text',
  LINK = 'link',
  LOGO = 'logo',
  SOCIAL = 'social',
  IMAGE = 'image',
  IMAGETEXT = 'imagetext',
  VIDEO = 'video',
  SHOP = 'shop',
  UNKNOWN = 'unknown',
}

@Table({ tableName: 'multilinks', paranoid: true })
export class Multilink extends Model<Multilink, MultilinkCreationAttributes> {
  @ApiProperty({ example: '69', description: 'Unique ML ID' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'VasyaRaper', description: 'ML url name' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @ApiProperty({
    example: '[logo, text, image, social]',
    description: 'ML blocks structure',
  })
  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: false })
  contentSet: MLContentType[];

  @ApiProperty({ example: '#ff0', description: 'ML CSS background' })
  @Column({ type: DataType.STRING, allowNull: false })
  background: string;

  @HasMany(() => MLLogo)
  logoSet: MLLogo[];

  @HasMany(() => MLText)
  textSet: MLText[];

  @HasMany(() => MLLink)
  linkSet: MLLink[];

  @HasMany(() => MLImage)
  imageSet: MLImage[];

  @HasMany(() => MLImageText)
  imageTextSet: MLImageText[];

  @HasMany(() => MLSocial)
  socialSet: MLSocial[];

  @HasMany(() => MLShop)
  shopSet: MLShop[];

  @HasMany(() => MLVideo)
  videoSet: MLVideo[];

  @HasMany(() => MLImageData)
  images: MLImageData[];

  @ApiProperty({ example: '69', description: 'ML customer clicks count' })
  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  clickCount: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
