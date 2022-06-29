import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { MLContentType, Multilink } from '../multilink.model';
import { IMLMapCreationAttributes } from '../types/creation-attr';

@Table({ tableName: 'mlmaps' })
export class MLMap
  extends Model<MLMap, IMLMapCreationAttributes>
  implements IMLMapCreationAttributes
{
  @ApiProperty({ example: '69', description: 'Unique MLMap ID' })
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

  @ApiProperty({ example: 'map', description: 'ML content type' })
  @Column({ type: DataType.STRING, allowNull: false })
  type: MLContentType.MAP;

  // ================================================================================

  @ApiProperty({ example: 'https://www.maps.google.com', description: 'map URL' })
  @Column({ type: DataType.STRING, allowNull: false })
  url: string;

  @Column({ type: DataType.ARRAY(DataType.FLOAT), allowNull: false })
  latLng: [number, number];

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
