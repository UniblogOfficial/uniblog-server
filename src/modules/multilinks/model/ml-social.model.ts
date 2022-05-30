import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { MLContentType, Multilink } from './multilink.model';

interface MLSocialCreationAttributes {
  multilinkId: number;
  order: number;
  type: MLContentType;
  links: string[];
  linkTypes: SocialNetwork[];
  size: number;

  padding?: number[];
  margin?: number[];
  background?: string;
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

@Table({ tableName: 'mlsocials' })
export class MLSocial extends Model<MLSocial, MLSocialCreationAttributes> {
  @ApiProperty({ example: '69', description: 'Unique MLSocial ID' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: '3', description: 'ML content order value' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  order: number;

  @Column({ type: DataType.ARRAY(DataType.FLOAT) })
  padding: number[];

  @Column({ type: DataType.ARRAY(DataType.FLOAT) })
  margin: number | number[];

  @ApiProperty({ example: '#ff0', description: 'ML block CSS background' })
  @Column({ type: DataType.STRING })
  background: string;

  @ApiProperty({ example: 'social', description: 'ML content type' })
  @Column({ type: DataType.STRING, allowNull: false })
  type: MLContentType;

  // ================================================================================

  @ApiProperty({ example: '[https://vk.com/VasyaRaper]', description: 'URL' })
  @Column({ type: DataType.ARRAY(DataType.STRING) })
  links: string[];

  @ApiProperty({
    example: '[vk]',
    description: 'Type of social (name of service)',
  })
  @Column({ type: DataType.ARRAY(DataType.STRING) })
  linkTypes: SocialNetwork[];

  @Column({ type: DataType.FLOAT })
  size: number;

  @ForeignKey(() => Multilink)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  multilinkId: number;

  @BelongsTo(() => Multilink)
  multilink: Multilink;
}
