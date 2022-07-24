import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';

import { MLShop } from 'modules/multilinks/model/blocks/shop/shop.model';

interface MLShopCellCreationAttrs {
  blockId: number;
  order: number;

  image: string;
  title: string;
  subtitle?: string;
  href?: string;
  description?: string;
  price?: string;
  button?: string;

  background?: string;
}

@Table({ tableName: 'MLShopCells' })
export class MLShopCell
  extends Model<MLShopCell, MLShopCellCreationAttrs>
  implements MLShopCellCreationAttrs
{
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
  subtitle: string;

  @Column({ type: DataType.STRING })
  description: string;

  @Column({ type: DataType.STRING })
  price: string;

  @Column({ type: DataType.STRING })
  button: string;

  @Column({ type: DataType.STRING })
  href: string;

  @ApiProperty({ example: '#f00', description: 'Shop cell CSS background' })
  @Column({ type: DataType.STRING })
  background: string;

  @ForeignKey(() => MLShop)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  blockId: number;

  @BelongsTo(() => MLShop)
  block: MLShop;
}
