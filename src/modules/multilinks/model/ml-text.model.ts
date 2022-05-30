import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { MLContentType, Multilink } from './multilink.model';

interface MLTextCreationAttributes {
  multilinkId: number;
  order: number;
  type: MLContentType;

  text: string;
  color?: string;
  fontSize?: number;
  fontWeight?: number;
  align?: string; // 'right' | 'left' | 'center' | 'justify';
  font?: string;

  padding?: number[];
  margin?: number[];
  background?: string;
}

@Table({ tableName: 'mltexts' })
export class MLText extends Model<MLText, MLTextCreationAttributes> {
  @ApiProperty({ example: '69', description: 'Unique MLText ID' })
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

  @ApiProperty({ example: 'text', description: 'ML content type' })
  @Column({ type: DataType.STRING, allowNull: false })
  type: MLContentType;

  // ================================================================================

  @ApiProperty({ example: 'Subscribe NOW!', description: 'Text content' })
  @Column({ type: DataType.TEXT, allowNull: false })
  text: string;

  @ApiProperty({ example: '#ff0', description: 'CSS text color' })
  @Column({ type: DataType.STRING })
  color: string;

  @Column({ type: DataType.FLOAT })
  fontSize: number;

  @Column({ type: DataType.FLOAT })
  fontWeight: number;

  @Column({ type: DataType.STRING, defaultValue: 'left' })
  align: string; // 'right' | 'left' | 'center' | 'justify';

  @Column({ type: DataType.STRING })
  font: string;

  @ForeignKey(() => Multilink)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  multilinkId: number;

  @BelongsTo(() => Multilink)
  multilink: Multilink;
}
