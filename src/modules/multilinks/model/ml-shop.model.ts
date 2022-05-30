import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { MLShopCell } from './ml-shop-cell.model';
import { MLContentType, Multilink } from './multilink.model';

interface MLShopCreationAttributes {
  multilinkId: number;
  order: number;
  type: MLContentType;

  grid: string;
  gap?: number;

  padding?: number[];
  margin?: number[];
  background?: string;
}

@Table({ tableName: 'mlshops' })
export class MLShop extends Model<MLShop, MLShopCreationAttributes> {
  @ApiProperty({ example: '69', description: 'Unique MLShop ID' })
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

  @ApiProperty({ example: 'shop', description: 'ML content type' })
  @Column({ type: DataType.STRING, allowNull: false })
  type: MLContentType;

  // ================================================================================

  @Column({ type: DataType.STRING })
  grid: string;

  @Column({ type: DataType.FLOAT })
  gap: number;

  @HasMany(() => MLShopCell)
  cells: MLShopCell[];

  @ForeignKey(() => Multilink)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  multilinkId: number;

  @BelongsTo(() => Multilink)
  multilink: Multilink;
}
