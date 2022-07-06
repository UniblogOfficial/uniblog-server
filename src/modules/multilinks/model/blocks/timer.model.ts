import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Table } from 'sequelize-typescript';
import { MLContentType } from '../multilink.model';
import { IMLTimerCreationAttrs } from '../types/creation-attr';
import { MLAnyTextBlock } from './anyTextBlock.model';

@Table({ tableName: 'MLTimers' })
export class MLTimer
  extends MLAnyTextBlock<MLContentType.TIMER, IMLTimerCreationAttrs>
  implements IMLTimerCreationAttrs
{
  @ApiProperty({ example: 'https://ibb.co/q216/log.png', description: 'url to image source' })
  @Column({ type: DataType.STRING, allowNull: false })
  image: string;

  @Column({ type: DataType.STRING })
  title: string;

  @ApiProperty({ example: 'https://somelink.com', description: 'url to target source' })
  @Column({ type: DataType.STRING, allowNull: false })
  href: string;

  @ApiProperty({ example: '3', description: 'countdown for offer' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  countdown: number;

  @Column({ type: DataType.STRING, defaultValue: 'bottom' })
  imgPosition: 'top' | 'bottom';

  @Column({ type: DataType.STRING, defaultValue: 'outside' })
  textPosition: 'inside' | 'outside';
}
