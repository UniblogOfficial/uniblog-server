import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Table } from 'sequelize-typescript';

import { MLContentType } from 'modules/multilinks/model/multilink.model';
import { IMLFeedbackCreationAttrs } from 'modules/multilinks/model/types/creation-attr';
import { MLAnyTextBlock } from 'modules/multilinks/model/blocks/anyTextBlock.model';

@Table({ tableName: 'MLFeedbacks' })
export class MLFeedback
  extends MLAnyTextBlock<MLContentType.FEEDBACK, IMLFeedbackCreationAttrs>
  implements IMLFeedbackCreationAttrs
{
  @ApiProperty({ example: 'https://somemail@gmail.com', description: 'url for feedback accept' })
  @Column({ type: DataType.STRING })
  target: string;

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
}
