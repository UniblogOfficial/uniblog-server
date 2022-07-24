import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Table } from 'sequelize-typescript';

import { IMLTextProperties } from 'modules/multilinks/model/types/creation-attr';
import { MLBlock } from 'modules/multilinks/model/blocks/block.model';

@Table({ tableName: 'MLAnyTextBlocks' })
export class MLAnyTextBlock<Block, BlockAttrs>
  extends MLBlock<Block, BlockAttrs>
  implements IMLTextProperties
{
  @ApiProperty({ example: '#ff0', description: 'CSS text color' })
  @Column({ type: DataType.STRING })
  color: string;

  /* @Column({ type: DataType.STRING })
  font: string; */

  @Column({ type: DataType.STRING })
  fontStyle: string;

  @Column({ type: DataType.STRING })
  fontVariant: string;

  @Column({ type: DataType.INTEGER })
  fontWeight: number;

  @Column({ type: DataType.FLOAT })
  fontSize: number;

  @Column({ type: DataType.FLOAT })
  lineHeight: number;

  @Column({ type: DataType.STRING })
  fontFamily: string;

  @Column({ type: DataType.FLOAT })
  letterSpacing: number;

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  textShadow: string[]; // 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue;

  @Column({ type: DataType.STRING, defaultValue: 'left' })
  textAlign: 'right' | 'left' | 'center' | 'justify';
}
