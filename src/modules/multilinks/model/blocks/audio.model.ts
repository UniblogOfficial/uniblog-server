import { MLBlock } from './block.model';
import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Table } from 'sequelize-typescript';
import { MLContentType } from '../multilink.model';
import { IMLAudioCreationAttrs } from '../types/creation-attr';

@Table({ tableName: 'MLAudios' })
export class MLAudio
  extends MLBlock<MLContentType.AUDIO, IMLAudioCreationAttrs>
  implements IMLAudioCreationAttrs
{
  /* @ApiProperty({ example: '69', description: 'Unique MLAudio ID' })
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

  @ApiProperty({ example: 'audio', description: 'ML content type' })
  @Column({ type: DataType.STRING, allowNull: false })
  type: MLContentType.AUDIO; */

  // ================================================================================

  @ApiProperty({ example: 'https://www.youtube.com/embed/hYu0d-4SX_Y', description: 'audio URL' })
  @Column({ type: DataType.STRING, allowNull: false })
  url: string;

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
