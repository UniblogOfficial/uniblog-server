import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Table } from 'sequelize-typescript';
import { MLContentType } from '../multilink.model';
import { IMLMapCreationAttrs } from '../types/creation-attr';
import { MLBlock } from './block.model';

@Table({ tableName: 'MLMaps' })
export class MLMap
  extends MLBlock<MLContentType.MAP, IMLMapCreationAttrs>
  implements IMLMapCreationAttrs
{
  /* @ApiProperty({ example: '69', description: 'Unique MLMap ID' })
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
  type: MLContentType.MAP; */

  // ================================================================================

  @ApiProperty({ example: 'https://www.maps.google.com', description: 'map URL' })
  @Column({ type: DataType.STRING, allowNull: false })
  url: string;

  @Column({ type: DataType.ARRAY(DataType.FLOAT), allowNull: false })
  latLng: [number, number];

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
