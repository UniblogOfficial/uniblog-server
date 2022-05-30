import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { MLShop } from './ml-shop.model';

interface MLShopCellCreationAttributes {
  blockId: number;
  order: number;

  image: string;
  title: string;
  subtitle?: string;
  href?: string;

  background?: string;
  color?: string;
  fontSize?: number;
  fontWeight?: number;
  align?: 'right' | 'left' | 'center';
  font?: string;
  subtitleColor?: string;
  subtitleFontSize?: number;
  subtitleFontWeight?: number;
  subtitleAlign?: 'right' | 'left' | 'center';
  subtitleFont?: string;
}

@Table({ tableName: 'mlshopcells' })
export class MLShopCell extends Model<MLShopCell, MLShopCellCreationAttributes> {
  @ApiProperty({ example: '69', description: 'Unique MLShopCell ID' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: '3', description: 'ML content order value' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  order: number;

  @Column({ type: DataType.STRING, allowNull: false })
  image: string;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING })
  subtitle?: string;

  @Column({ type: DataType.STRING })
  href?: string;

  @ApiProperty({ example: '#f00', description: 'Shop cell CSS background' })
  @Column({ type: DataType.STRING })
  background: string;

  @Column({ type: DataType.STRING })
  color?: string;

  @Column({ type: DataType.FLOAT })
  fontSize: number;

  @Column({ type: DataType.FLOAT })
  fontWeight: number;

  @Column({ type: DataType.STRING })
  align: 'right' | 'left' | 'center';

  @Column({ type: DataType.STRING })
  font: string;

  @Column({ type: DataType.STRING })
  subtitleColor: string;

  @Column({ type: DataType.FLOAT })
  subtitleFontSize: number;

  @Column({ type: DataType.FLOAT })
  subtitleFontWeight: number;

  @Column({ type: DataType.STRING })
  subtitleAlign: 'right' | 'left' | 'center';

  @Column({ type: DataType.STRING })
  subtitleFont: string;

  @ForeignKey(() => MLShop)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  blockId: number;

  @BelongsTo(() => MLShop)
  block: MLShop;
}
