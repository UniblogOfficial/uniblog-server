import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Table } from 'sequelize-typescript';

import { MLContentType } from 'modules/multilinks/model/multilink.model';
import { IMLVoteCreationAttrs } from 'modules/multilinks/model/types/creation-attr';
import { MLAnyTextBlock } from 'modules/multilinks/model/blocks/anyTextBlock.model';
import { MLVoteCell } from 'modules/multilinks/model/blocks/vote/vote-cell.model';

@Table({ tableName: 'MLVotes' })
export class MLVote
  extends MLAnyTextBlock<MLContentType.VOTE, IMLVoteCreationAttrs>
  implements IMLVoteCreationAttrs
{
  /* @ApiProperty({ example: '69', description: 'Unique MLVote ID' })
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
  type: MLContentType.VOTE; */

  // ================================================================================

  @HasMany(() => MLVoteCell)
  cells: MLVoteCell[];

  @ApiProperty({ example: 'https://somemail@gmail.com', description: 'url for feedback accept' })
  @Column({ type: DataType.STRING })
  target: string;

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

  @Column({ type: DataType.STRING })
  titleBackground: string;

  @Column({ type: DataType.ARRAY(DataType.INTEGER), defaultValue: [0] })
  titleBorderRadius: number[];

  @Column({ type: DataType.STRING })
  buttonBackground: string;

  @Column({ type: DataType.ARRAY(DataType.INTEGER), defaultValue: [0] })
  buttonBorderRadius: number[];

  @Column({ type: DataType.STRING })
  buttonColor: string;

  @Column({ type: DataType.STRING })
  buttonFont: string;

  @Column({ type: DataType.FLOAT })
  buttonLetterSpacing: number;

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  buttonTextShadow: string[];

  @Column({ type: DataType.STRING })
  buttonTextAlign: 'right' | 'left' | 'center' | 'justify';

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
