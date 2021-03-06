import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Table } from 'sequelize-typescript';
import { MLContentType } from '../multilink.model';
import { IMLButtonCreationAttrs } from '../types/creation-attr';
import { MLAnyTextBlock } from './anyTextBlock.model';

@Table({ tableName: 'MLButtons' })
export class MLButton
  extends MLAnyTextBlock<MLContentType.BUTTON, IMLButtonCreationAttrs>
  implements IMLButtonCreationAttrs
{
  /* @ApiProperty({ example: '69', description: 'Unique MLButton ID' })
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
  background: string; */

  @ApiProperty({ example: '24', description: 'ML block CSS borderRadius' })
  @Column({ type: DataType.ARRAY(DataType.INTEGER), defaultValue: [0] })
  borderRadius: number[];

  /* @ApiProperty({ example: 'button', description: 'ML content type' })
  @Column({ type: DataType.STRING, allowNull: false })
  type: MLContentType.BUTTON; */

  // ================================================================================

  @Column({ type: DataType.STRING })
  href: string;

  @Column({ type: DataType.STRING })
  title: string;

  @Column({ type: DataType.STRING })
  image: string;

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

  @Column({ type: DataType.STRING, defaultValue: 'left' })
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
