import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Multilink } from '../multilink.model';
import { IMLAnyBlockCreationAttrs } from '../types/creation-attr';

@Table({ tableName: 'MLBlocks' })
export class MLBlock<Block, BlockAttrs>
  extends Model<MLBlock<Block, BlockAttrs>, BlockAttrs>
  implements IMLAnyBlockCreationAttrs
{
  @ApiProperty({ example: '69', description: 'Unique MLBlock ID' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: '5', description: 'ML content order value' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  order: number;

  @Column({ type: DataType.ARRAY(DataType.FLOAT) })
  padding: number[];

  @Column({ type: DataType.ARRAY(DataType.FLOAT) })
  margin: number[];

  @Column({ type: DataType.STRING })
  border: string; // 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue;

  @ApiProperty({ example: '#ff0', description: 'ML block CSS background' })
  @Column({ type: DataType.STRING })
  background: string;

  @ApiProperty({ example: 'audio', description: 'ML content type' })
  @Column({ type: DataType.STRING, allowNull: false })
  type: Block;

  @ForeignKey(() => Multilink)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  multilinkId: number;

  @BelongsTo(() => Multilink)
  multilink: Multilink;
}
