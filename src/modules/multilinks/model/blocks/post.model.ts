import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Table } from 'sequelize-typescript';
import { MLContentType } from '../multilink.model';
import { IMLPostCreationAttrs } from '../types/creation-attr';
import { MLBlock } from './block.model';

@Table({ tableName: 'MLPosts' })
export class MLPost
  extends MLBlock<MLContentType.POST, IMLPostCreationAttrs>
  implements IMLPostCreationAttrs
{
  /* @ApiProperty({ example: '69', description: 'Unique MLPost ID' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: '5', description: 'ML content order value' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  order: number;

  @Column({ type: DataType.ARRAY(DataType.FLOAT) })
  padding: number[];

  @Column({ type: DataType.ARRAY(DataType.FLOAT) })
  margin: number[];

  @ApiProperty({ example: '#ff0', description: 'ML block CSS background' })
  @Column({ type: DataType.STRING })
  background: string;

  @ApiProperty({ example: 'post', description: 'ML content type' })
  @Column({ type: DataType.STRING, allowNull: false })
  type: MLContentType.POST; */

  // ================================================================================

  @ApiProperty({ example: 'https://www.instagram.com/postId', description: 'post URL' })
  @Column({ type: DataType.STRING, allowNull: false })
  url: string;

  // ================================================================================

  /* @ForeignKey(() => Multilink)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  multilinkId: number;

  @BelongsTo(() => Multilink)
  multilink: Multilink; */
}
