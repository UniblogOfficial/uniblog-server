import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Multilink } from './multilink.model';

interface MLLogoCreationAttributes {
  multilinkId: number;
  imageType: string;
  imageData: Buffer;
}

@Table({ tableName: 'mllogos' })
export class MLLogo extends Model<MLLogo, MLLogoCreationAttributes> {
  @ApiProperty({ example: '69', description: 'Unique MLLogo ID' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'image/png', description: 'Image mime type' })
  @Column({ type: DataType.STRING })
  imageType: string;

  @ApiProperty({
    example: '<A HUGE STRING OF RANDOM CHARS REPRESENTING IMAGE>',
    description: 'Image data',
  })
  @Column({ type: DataType.BLOB('long') })
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
