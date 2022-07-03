import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { MLContentType, Multilink } from '../multilink.model';

interface MLImageDataCreationAttrs {
  multilinkId: number;
  type: MLContentType | 'backgroundImage';
  order: number;
  suborder: number;
  imageName?: string;
  imageType: string;
  imageData: Buffer;
}

@Table({ tableName: 'mlimagedatas' })
export class MLImageData
  extends Model<MLImageData, MLImageDataCreationAttrs>
  implements MLImageDataCreationAttrs
{
  @ApiProperty({ example: '69', description: 'Unique MLImageData ID' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  type: MLContentType | 'backgroundImage';

  @ApiProperty({ example: '3', description: 'ML content order value' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  order: number;

  @ApiProperty({ example: '0', description: 'In-block order value' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  suborder: number;

  @ApiProperty({ example: '0_logo_1', description: 'Image name' })
  @Column({ type: DataType.STRING })
  imageName: string;

  @ApiProperty({ example: 'image/png', description: 'Image mime type' })
  @Column({ type: DataType.STRING, allowNull: false })
  imageType: string;

  @ApiProperty({
    example: '<A HUGE STRING OF RANDOM CHARS REPRESENTING IMAGE>',
    description: 'Image data',
  })
  @Column({ type: DataType.BLOB('long'), allowNull: false })
  imageData: Buffer;

  @ForeignKey(() => Multilink)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  multilinkId: number;

  @BelongsTo(() => Multilink)
  multilink: Multilink;
}
