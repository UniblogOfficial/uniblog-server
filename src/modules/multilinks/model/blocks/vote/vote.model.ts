import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { MLContentType, Multilink } from '../../multilink.model';
import { IMLVoteCreationAttributes } from '../../types/creation-attr';
import { MLVoteCell } from './vote-cell.model';

@Table({ tableName: 'mlvotes' })
export class MLVote extends Model<MLVote, IMLVoteCreationAttributes> {
  @ApiProperty({ example: '69', description: 'Unique MLVote ID' })
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
  background: string;

  @ApiProperty({ example: 'vote', description: 'ML content type' })
  @Column({ type: DataType.STRING, allowNull: false })
  type: MLContentType.VOTE;

  // ================================================================================

  @HasMany(() => MLVoteCell)
  cells: MLVoteCell[];

  // ================================================================================

  @ApiProperty({ example: '#ff0', description: 'CSS text color' })
  @Column({ type: DataType.STRING })
  color: string;

  @Column({ type: DataType.STRING })
  font: string;

  @Column({ type: DataType.FLOAT })
  letterSpacing: number;

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  textShadow: string[]; // 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue;

  @Column({ type: DataType.STRING, defaultValue: 'left' })
  align: string; // 'right' | 'left' | 'center' | 'justify';

  @Column({ type: DataType.STRING })
  titleBackground: string;

  @Column({ type: DataType.FLOAT })
  titleBorderRadius: number;

  @Column({ type: DataType.STRING })
  buttonBackground: string;

  @Column({ type: DataType.FLOAT })
  buttonBorderRadius: number;

  @Column({ type: DataType.STRING })
  buttonColor: string;

  @Column({ type: DataType.STRING })
  buttonFont: string;

  @Column({ type: DataType.FLOAT })
  buttonLetterSpacing: number;

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  buttonTextShadow: string[];

  @Column({ type: DataType.STRING })
  buttonAlign: 'right' | 'left' | 'center' | 'justify';

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
