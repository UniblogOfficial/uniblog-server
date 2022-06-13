import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { MLContentType, Multilink } from '../multilink.model';
import { IMLDividerCreationAttributes } from '../types/creation-attr';

@Table({ tableName: 'mldividers' })
export class MLDivider extends Model<MLDivider, IMLDividerCreationAttributes> {
  @ApiProperty({ example: '69', description: 'Unique MLDivider ID' })
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

  @ApiProperty({ example: 'divider', description: 'ML content type' })
  @Column({ type: DataType.STRING, allowNull: false })
  type: MLContentType.DIVIDER;

  // ================================================================================

  @Column({ type: DataType.STRING })
  icon: string;

  @Column({ type: DataType.STRING })
  primaryColor: string;

  @Column({ type: DataType.STRING })
  secondaryColor: string;

  @Column({ type: DataType.STRING })
  line: 'solid' | 'faded';

  @Column({ type: DataType.STRING })
  lineColor: string;

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
