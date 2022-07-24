import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Table } from 'sequelize-typescript';

import { MLContentType } from 'modules/multilinks/model/multilink.model';
import { IMLDividerCreationAttrs } from 'modules/multilinks/model/types/creation-attr';
import { MLBlock } from 'modules/multilinks/model/blocks/block.model';

@Table({ tableName: 'MLDividers' })
export class MLDivider
  extends MLBlock<MLContentType.DIVIDER, IMLDividerCreationAttrs>
  implements IMLDividerCreationAttrs
{
  /* @ApiProperty({ example: '69', description: 'Unique MLDivider ID' })
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
 */
  // ================================================================================

  @ApiProperty({ example: 'heart', description: 'icon name according to certain icon list' })
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

  /* @ForeignKey(() => Multilink)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  multilinkId: number;

  @BelongsTo(() => Multilink)
  multilink: Multilink; */
}
