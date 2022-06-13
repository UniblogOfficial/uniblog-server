import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { MLContentType, Multilink } from '../multilink.model';
import { IMLSocialCreationAttributes, SocialNetwork } from '../types/creation-attr';

@Table({ tableName: 'mlsocials' })
export class MLSocial extends Model<MLSocial, IMLSocialCreationAttributes> {
  @ApiProperty({ example: '69', description: 'Unique MLSocial ID' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: '3', description: 'ML content order value' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  order: number;

  @Column({ type: DataType.ARRAY(DataType.FLOAT), defaultValue: [0] })
  padding: number[];

  @Column({ type: DataType.ARRAY(DataType.FLOAT), defaultValue: [0] })
  margin: number[];

  @ApiProperty({ example: '#ff0', description: 'ML block CSS background' })
  @Column({ type: DataType.STRING, defaultValue: '#0000' })
  background: string;

  @ApiProperty({ example: 'social', description: 'ML content type' })
  @Column({ type: DataType.STRING, allowNull: false })
  type: MLContentType.SOCIAL;

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

  @Column({ type: DataType.STRING })
  rows: string;

  @Column({ type: DataType.STRING })
  columns: string;

  @ForeignKey(() => Multilink)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  multilinkId: number;

  @BelongsTo(() => Multilink)
  multilink: Multilink;
}
