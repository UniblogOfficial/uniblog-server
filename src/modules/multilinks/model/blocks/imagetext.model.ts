import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Table } from 'sequelize-typescript';

import { MLContentType } from 'modules/multilinks/model/multilink.model';
import { IMLImageTextCreationAttrs } from 'modules/multilinks/model/types/creation-attr';
import { MLAnyTextBlock } from 'modules/multilinks/model/blocks/anyTextBlock.model';

@Table({ tableName: 'MLImageTexts' })
export class MLImageText
  extends MLAnyTextBlock<MLContentType.IMAGETEXT, IMLImageTextCreationAttrs>
  implements IMLImageTextCreationAttrs
{
  /* @ApiProperty({ example: '69', description: 'Unique MLImageText ID' })
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
  background: string; */

  @ApiProperty({ example: '24', description: 'ML block CSS borderRadius' })
  @Column({ type: DataType.ARRAY(DataType.INTEGER), defaultValue: [0] })
  borderRadius: number[];

  /*  @ApiProperty({ example: 'imagetext', description: 'ML content type' })
  @Column({ type: DataType.STRING, allowNull: false })
  type: MLContentType.IMAGETEXT; */

  // ================================================================================

  @ApiProperty({ example: 'https://ibb.co/q216/log.png', description: 'url to image source' })
  @Column({ type: DataType.STRING, allowNull: false })
  image: string;

  @Column({ type: DataType.STRING, allowNull: false })
  imgPosition: 'right' | 'left';

  @Column({ type: DataType.TEXT, allowNull: false })
  text: string;

  @Column({ type: DataType.STRING, defaultValue: 'left' })
  hAlign: 'right' | 'left' | 'center' | 'justify';

  @Column({ type: DataType.STRING, defaultValue: 'center' })
  vAlign: 'top' | 'center' | 'bottom';

  @ApiProperty({ example: 'https://somelink.com', description: 'url to target source' })
  @Column({ type: DataType.STRING })
  href: string;

  // ================================================================================

  /* @ApiProperty({ example: '#ff0', description: 'CSS text color' })
  @Column({ type: DataType.STRING })
  color: string;

  @Column({ type: DataType.STRING })
  font: string;

  @Column({ type: DataType.FLOAT })
  letterSpacing: number;

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  textShadow: string[]; // 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue; */

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
