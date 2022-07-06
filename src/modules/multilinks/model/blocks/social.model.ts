import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Table } from 'sequelize-typescript';
import { MLContentType } from '../multilink.model';
import { IMLSocialCreationAttrs, SocialNetwork, SocialService } from '../types/creation-attr';
import { MLBlock } from './block.model';

@Table({ tableName: 'MLSocials' })
export class MLSocial
  extends MLBlock<MLContentType.SOCIAL, IMLSocialCreationAttrs>
  implements IMLSocialCreationAttrs
{
  /* @ApiProperty({ example: '69', description: 'Unique MLSocial ID' })
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
  type: MLContentType.SOCIAL; */

  // ================================================================================

  @ApiProperty({ example: '[https://vk.com/VasyaRaper]', description: 'URL' })
  @Column({ type: DataType.ARRAY(DataType.STRING) })
  links: string[];

  @ApiProperty({
    example: '[vk]',
    description: 'Type of social (name of service)',
  })
  @Column({ type: DataType.ARRAY(DataType.STRING) })
  linkTypes: (SocialNetwork | SocialService)[];

  @ApiProperty({ example: 'font-awesome', description: 'icons set id or name' })
  @Column({ type: DataType.STRING })
  setId: string;

  @Column({ type: DataType.FLOAT })
  size: number;

  @Column({ type: DataType.STRING })
  rows: string;

  @Column({ type: DataType.STRING })
  columns: string;

  /* @ForeignKey(() => Multilink)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  multilinkId: number;

  @BelongsTo(() => Multilink)
  multilink: Multilink; */
}
