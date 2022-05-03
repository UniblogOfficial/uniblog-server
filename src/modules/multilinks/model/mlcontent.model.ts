import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Multilink } from './multilink.model';

interface MLContentCreationAttributes {
  multilinkId: number;
  order: number;
  type: ContentType;
  link?: string;
  linkType?: SocialNetwork | 'third-party';
  title?: string;
  text?: string;
  image?: string;
}

export enum ContentType {
  LINK = 'link',
  TEXT = 'text',
  PHOTO = 'photo',
  UNKNOWN = 'unknown',
}

export enum SocialNetwork {
  VK = 'vk',
  YOUTUBE = 'youtube',
  INSTAGRAM = 'instagram',
  TELEGRAM = 'telegram',
  TIKTOK = 'tiktok',
  TWITTER = 'twitter',
  FACEBOOK = 'facebook',
  PINTEREST = 'pinterest',
}

@Table({ tableName: 'mlcontents' })
export class MLContent extends Model<MLContent, MLContentCreationAttributes> {
  @ApiProperty({ example: '69', description: 'Unique MLContent ID' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: '3', description: 'ML content order value' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  order: number;

  @ApiProperty({ example: 'link', description: 'ML content type' })
  @Column({ type: DataType.STRING, allowNull: false })
  type: ContentType;

  @ApiProperty({ example: 'https://vk.com/VasyaRaper', description: 'URL if exists' })
  @Column({ type: DataType.STRING })
  link: string;

  @ApiProperty({
    example: 'vk',
    description: 'Type of social if link is social OR type third-party if not',
  })
  @Column({ type: DataType.STRING })
  linkType: SocialNetwork | 'third-party';

  @ApiProperty({ example: 'VK', description: 'URL visible title' })
  @Column({ type: DataType.STRING })
  title: string;

  @ApiProperty({ example: 'Subscribe NOW!', description: 'Text if exists' })
  @Column({ type: DataType.TEXT })
  text: string;

  @ApiProperty({ example: 'src/img... xz', description: 'Image url if exists' })
  @Column({ type: DataType.STRING })
  image: string;

  @ForeignKey(() => Multilink)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  multilinkId: number;

  @BelongsTo(() => Multilink)
  multilink: Multilink;
}
