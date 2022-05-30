import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { MLContentType, Multilink } from './multilink.model';

interface MLImageCreationAttributes {
  multilinkId: number;
  order: number;
  type: MLContentType;

  images: string[];
  grid?: '1fr' | '1fr 1fr' | '1fr 1fr 1fr';

  padding?: number[];
  margin?: number[];
  background?: string;
}

@Table({ tableName: 'mlimages' })
export class MLImage extends Model<MLImage, MLImageCreationAttributes> {
  @ApiProperty({ example: '69', description: 'Unique MLImage ID' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: '3', description: 'ML content order value' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  order: number;

  @Column({ type: DataType.ARRAY(DataType.FLOAT) })
  padding: number[];

  @Column({ type: DataType.ARRAY(DataType.FLOAT) })
  margin: number[];

  @ApiProperty({ example: '#ff0', description: 'ML block CSS background' })
  @Column({ type: DataType.STRING })
  background: string;

  @ApiProperty({ example: 'image', description: 'ML content type' })
  @Column({ type: DataType.STRING, allowNull: false })
  type: MLContentType;

  // ================================================================================

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: false })
  images: string[];

  @Column({ type: DataType.STRING })
  grid: string;

  @ForeignKey(() => Multilink)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  multilinkId: number;

  @BelongsTo(() => Multilink)
  multilink: Multilink;
}
