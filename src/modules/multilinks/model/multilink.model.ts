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
import { User } from '../../users/user.model';
import { MLContent } from './mlcontent.model';

interface MultilinkCreationAttributes {
  name: string;
  template: number[];
  background: string;
  userId: number;
}

@Table({ tableName: 'multilinks' })
export class Multilink extends Model<Multilink, MultilinkCreationAttributes> {
  @ApiProperty({ example: '69', description: 'Unique ML ID' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'VasyaRaper', description: 'ML url name' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @ApiProperty({
    example: '[50, 25, 12.5, 12.5]',
    description: 'ML layout template (in parts of height)',
  })
  @Column({ type: DataType.ARRAY(DataType.FLOAT), allowNull: false })
  template: number[];

  @ApiProperty({ example: '#ff0', description: 'ML CSS background' })
  @Column({ type: DataType.STRING, allowNull: false })
  background: string;

  @HasMany(() => MLContent)
  content: MLContent[];

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
