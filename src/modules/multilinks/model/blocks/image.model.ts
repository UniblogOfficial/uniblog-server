import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Table } from 'sequelize-typescript';

import { MLContentType } from 'modules/multilinks/model/multilink.model';
import { IMLImageCreationAttrs } from 'modules/multilinks/model/types/creation-attr';
import { MLAnyTextBlock } from 'modules/multilinks/model/blocks/anyTextBlock.model';

@Table({ tableName: 'MLImages' })
export class MLImage
  extends MLAnyTextBlock<MLContentType.IMAGE, IMLImageCreationAttrs>
  implements IMLImageCreationAttrs
{
  /* @ApiProperty({ example: '69', description: 'Unique MLImage ID' })
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

  @ApiProperty({ example: 'image', description: 'ML content type' })
  @Column({ type: DataType.STRING, allowNull: false })
  type: MLContentType.IMAGE; */

  // ================================================================================

  @ApiProperty({ example: 'https://ibb.co/q216/log.png', description: 'url to image source' })
  @Column({ type: DataType.STRING, allowNull: false })
  image: string;

  @Column({ type: DataType.STRING })
  title: string;

  @ApiProperty({ example: 'https://somelink.com', description: 'url to target source' })
  @Column({ type: DataType.STRING })
  href: string;

  @Column({ type: DataType.STRING, defaultValue: 'bottom' })
  imgPosition: 'top' | 'bottom';

  @Column({ type: DataType.STRING, defaultValue: 'outside' })
  textPosition: 'inside' | 'outside';

  // ================================================================================

  /* @ApiProperty({ example: '#ff0', description: 'CSS text color' })
  @Column({ type: DataType.STRING })
  color: string;

  @Column({ type: DataType.STRING })
  font: string;

  @Column({ type: DataType.FLOAT })
  letterSpacing: number;

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  textShadow: string[]; // 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue;

  @Column({ type: DataType.STRING, defaultValue: 'center' })
  textAlign: 'right' | 'left' | 'center' | 'justify'; */

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
