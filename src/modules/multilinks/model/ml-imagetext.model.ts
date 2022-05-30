import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { MLContentType, Multilink } from './multilink.model';

interface MLImageTextCreationAttributes {
  multilinkId: number;
  order: number;
  type: MLContentType;

  image: string;
  imgPosition: 'right' | 'left';
  text: string;
  color?: string;
  fontSize?: number;
  fontWeight?: number;
  hAlign?: 'right' | 'left' | 'center' | 'justify';
  vAlign?: 'top' | 'center' | 'bottom';

  padding?: number[];
  margin?: number[];
  background?: string;
}

@Table({ tableName: 'mlimagetexts' })
export class MLImageText extends Model<MLImageText, MLImageTextCreationAttributes> {
  @ApiProperty({ example: '69', description: 'Unique MLImageText ID' })
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

  @ApiProperty({ example: 'imagetext', description: 'ML content type' })
  @Column({ type: DataType.STRING, allowNull: false })
  type: MLContentType;

  // ================================================================================

  @Column({ type: DataType.STRING, allowNull: false })
  image: string;

  @Column({ type: DataType.STRING, allowNull: false })
  imgPosition: 'right' | 'left';

  @Column({ type: DataType.TEXT, allowNull: false })
  text: string;

  @ApiProperty({ example: '#ff0', description: 'CSS text color' })
  @Column({ type: DataType.STRING })
  color: string;

  @Column({ type: DataType.FLOAT })
  fontSize: number;

  @Column({ type: DataType.FLOAT })
  fontWeight: number;

  @Column({ type: DataType.STRING })
  font: string;

  @Column({ type: DataType.STRING, defaultValue: 'left' })
  hAlign: string; // 'right' | 'left' | 'center' | 'justify';

  @Column({ type: DataType.STRING, defaultValue: 'center' })
  vAlign: string; // 'top' | 'center' | 'bottom';

  @ForeignKey(() => Multilink)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  multilinkId: number;

  @BelongsTo(() => Multilink)
  multilink: Multilink;
}
