import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Table } from 'sequelize-typescript';
import { MLContentType } from '../multilink.model';
import { IMLLogoCreationAttrs } from '../types/creation-attr';
import { MLBlock } from './block.model';

@Table({ tableName: 'MLLogos' })
export class MLLogo
  extends MLBlock<MLContentType.LOGO, IMLLogoCreationAttrs>
  implements IMLLogoCreationAttrs
{
  /* @ApiProperty({ example: '69', description: 'Unique MLLogo ID' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: '0', description: 'ML content order value' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  order: number;

  @Column({ type: DataType.ARRAY(DataType.FLOAT), defaultValue: [0] })
  padding: number[];

  @Column({ type: DataType.ARRAY(DataType.FLOAT), defaultValue: [0] })
  margin: number[];

  @ApiProperty({ example: '#ff0', description: 'ML block CSS background' })
  @Column({ type: DataType.STRING, defaultValue: '#0000' })
  background: string;

  @ApiProperty({ example: 'logo', description: 'ML content type' })
  @Column({ type: DataType.STRING, allowNull: false })
  type: MLContentType.LOGO; */

  // ================================================================================

  @Column({ type: DataType.STRING, allowNull: false })
  logo: string;

  @Column({ type: DataType.STRING })
  banner: string;

  @ApiProperty({ example: 100, description: 'logo size in px' })
  @Column({ type: DataType.INTEGER })
  size: number;

  @Column({ type: DataType.STRING, defaultValue: 'center' })
  hAlign: string; // 'right' | 'left' | 'center';

  @Column({ type: DataType.STRING, defaultValue: 'center' })
  vAlign: string; // 'top' | 'center' | 'bottom';

  /* @ForeignKey(() => Multilink)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  multilinkId: number;

  @BelongsTo(() => Multilink)
  multilink: Multilink; */
}
