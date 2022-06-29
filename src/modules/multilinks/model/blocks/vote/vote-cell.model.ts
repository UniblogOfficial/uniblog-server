import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { MLVote } from './vote.model';

interface MLVoteCellCreationAttributes {
  blockId: number;
  order: number;

  title: string;
  value: number;
}

@Table({ tableName: 'mlvotecells' })
export class MLVoteCell
  extends Model<MLVoteCell, MLVoteCellCreationAttributes>
  implements MLVoteCellCreationAttributes
{
  @ApiProperty({ example: '69', description: 'Unique MLShopCell ID' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: '3', description: 'ML content order value' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  order: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.FLOAT, allowNull: false })
  value: number;

  @ApiProperty({ example: '#f00', description: 'Shop cell CSS background' })
  @Column({ type: DataType.STRING })
  background: string;

  @ForeignKey(() => MLVote)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  blockId: number;

  @BelongsTo(() => MLVote)
  block: MLVote;
}
