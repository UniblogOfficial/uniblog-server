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
import { MLShopCell } from './shop-cell.model';
import { MLContentType, Multilink } from '../../multilink.model';
import { IMLShopCreationAttributes } from '../../types/creation-attr';

@Table({ tableName: 'mlshops' })
export class MLShop
  extends Model<MLShop, IMLShopCreationAttributes>
  implements IMLShopCreationAttributes
{
  @ApiProperty({ example: '69', description: 'Unique MLShop ID' })
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

  @ApiProperty({ example: '24', description: 'ML block CSS borderRadius' })
  @Column({ type: DataType.FLOAT, defaultValue: '#0000' })
  borderRadius: number;

  @ApiProperty({ example: 'shop', description: 'ML content type' })
  @Column({ type: DataType.STRING, allowNull: false })
  type: MLContentType.SHOP;

  // ================================================================================

  @Column({ type: DataType.STRING, defaultValue: '1fr 1fr 1fr' })
  grid: string;

  @Column({ type: DataType.FLOAT })
  gap: number;

  @HasMany(() => MLShopCell)
  cells: MLShopCell[];

  // ================================================================================

  @ApiProperty({ example: '#ff0', description: 'CSS text color' })
  @Column({ type: DataType.STRING })
  color: string;

  @Column({ type: DataType.STRING })
  font: string;

  @Column({ type: DataType.FLOAT })
  letterSpacing: number;

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  textShadow: string[]; // 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue;

  @Column({ type: DataType.STRING, defaultValue: 'left' })
  textAlign: 'right' | 'left' | 'center' | 'justify';

  @ApiProperty({ example: '#ff0', description: 'CSS text color' })
  @Column({ type: DataType.STRING })
  subtitleColor: string;

  @Column({ type: DataType.STRING })
  subtitleFont: string;

  @Column({ type: DataType.FLOAT })
  subtitleLetterSpacing: number;

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  subtitleTextShadow: string[]; // 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue;

  @Column({ type: DataType.STRING, defaultValue: 'left' })
  subtitleTextAlign: 'right' | 'left' | 'center' | 'justify';

  @ApiProperty({ example: '#ff0', description: 'CSS text color' })
  @Column({ type: DataType.STRING })
  descriptionColor: string;

  @Column({ type: DataType.STRING })
  descriptionFont: string;

  @Column({ type: DataType.FLOAT })
  descriptionLetterSpacing: number;

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  descriptionTextShadow: string[]; // 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue;

  @Column({ type: DataType.STRING, defaultValue: 'left' })
  descriptionTextAlign: 'right' | 'left' | 'center' | 'justify';

  @ApiProperty({ example: '#ff0', description: 'CSS text color' })
  @Column({ type: DataType.STRING })
  priceColor: string;

  @Column({ type: DataType.STRING })
  priceFont: string;

  @Column({ type: DataType.FLOAT })
  priceLetterSpacing: number;

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  priceTextShadow: string[]; // 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue;

  @Column({ type: DataType.STRING, defaultValue: 'left' })
  priceTextAlign: 'right' | 'left' | 'center' | 'justify';

  @ApiProperty({ example: '#ff0', description: 'ML shop block button CSS background' })
  @Column({ type: DataType.STRING, defaultValue: '#0000' })
  buttonBackground: string;

  @ApiProperty({ example: '24', description: 'ML shop block button CSS borderRadius' })
  @Column({ type: DataType.FLOAT, defaultValue: '#0000' })
  buttonBorderRadius: number;

  @ApiProperty({ example: '#ff0', description: 'CSS text color' })
  @Column({ type: DataType.STRING })
  buttonColor: string;

  @Column({ type: DataType.STRING })
  buttonFont: string;

  @Column({ type: DataType.FLOAT })
  buttonLetterSpacing: number;

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  buttonTextShadow: string[]; // 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue;

  @Column({ type: DataType.STRING, defaultValue: 'left' })
  buttonTextAlign: 'right' | 'left' | 'center' | 'justify';

  // ================================================================================

  @ForeignKey(() => Multilink)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  multilinkId: number;

  @BelongsTo(() => Multilink)
  multilink: Multilink;
}
