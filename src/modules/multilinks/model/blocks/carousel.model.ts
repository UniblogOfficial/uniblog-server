import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Table } from 'sequelize-typescript';

import { MLContentType } from 'modules/multilinks/model/multilink.model';
import { IMLCarouselCreationAttrs } from 'modules/multilinks/model/types/creation-attr';
import { MLBlock } from 'modules/multilinks/model/blocks/block.model';

@Table({ tableName: 'MLCarousels' })
export class MLCarousel
  extends MLBlock<MLContentType.CAROUSEL, IMLCarouselCreationAttrs>
  implements IMLCarouselCreationAttrs
{
  /*   @ApiProperty({ example: '69', description: 'Unique MLCarousel ID' })
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

  @ApiProperty({ example: 'carousel', description: 'ML content type' })
  @Column({ type: DataType.STRING, allowNull: false })
  type: MLContentType.CAROUSEL; */

  // ================================================================================

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: false })
  images: string[];

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  dots: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  arrows: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  swipe: boolean;

  @ApiProperty({ example: 3000, description: 'slider interval' })
  @Column({ type: DataType.INTEGER })
  interval: number;

  // ================================================================================

  /*   @ForeignKey(() => Multilink)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  multilinkId: number;

  @BelongsTo(() => Multilink)
  multilink: Multilink; */
}
