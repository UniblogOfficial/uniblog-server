import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { MLContentType, Multilink } from '../multilink.model';
import { IMLWidgetCreationAttributes } from '../types/creation-attr';

@Table({ tableName: 'mlwidgets' })
export class MLWidget
  extends Model<MLWidget, IMLWidgetCreationAttributes>
  implements IMLWidgetCreationAttributes
{
  @ApiProperty({ example: '69', description: 'Unique MLWidget ID' })
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

  @ApiProperty({ example: 'widget', description: 'ML content type' })
  @Column({ type: DataType.STRING, allowNull: false })
  type: MLContentType.WIDGET;

  // ================================================================================

  @ApiProperty({
    example: 'https://widget.qiwi.com/widgets/middle-widget...',
    description: 'widget URL',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  url: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  width: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  height: number;

  // ================================================================================

  @ForeignKey(() => Multilink)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  multilinkId: number;

  @BelongsTo(() => Multilink)
  multilink: Multilink;
}
