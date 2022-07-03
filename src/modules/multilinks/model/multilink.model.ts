import { MLImageData } from './images/ml-imagedata.model';
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
import { MLLogo } from './blocks/logo.model';
import { MLLink } from './blocks/link.model';
import { MLSocial } from './blocks/social.model';
import { MLText } from './blocks/text.model';
import { MLVideo } from './blocks/video.model';
import { MLImage } from './blocks/image.model';
import { MLImageText } from './blocks/imagetext.model';
import { MLShop } from './blocks/shop/shop.model';
import { MLAudio } from './blocks/audio.model';
import { MLButton } from './blocks/button.model';
import { MLCarousel } from './blocks/carousel.model';
import { MLDivider } from './blocks/divider.model';
import { MLMap } from './blocks/map.model';
import { MLPost } from './blocks/post.model';
import { MLVote } from './blocks/vote/vote.model';
import { MLWidget } from './blocks/widget.model';

interface MultilinkCreationAttrs {
  name: string;
  background: string;
  maxWidth: number;
  contentMap: MLContentType[];
  userId: number;
}

export enum MLContentType {
  TEXT = 'textBlocks',
  SOCIAL = 'socialBlocks',
  WIDGET = 'widgetBlocks',
  VIDEO = 'videoBlocks',
  AUDIO = 'audioBlocks',
  POST = 'postBlocks',
  VOTE = 'voteBlocks',
  MAP = 'mapBlocks',
  DIVIDER = 'dividerBlocks',

  LINK = 'linkBlocks',
  LOGO = 'logoBlocks',
  BUTTON = 'buttonBlocks',
  IMAGE = 'imageBlocks',
  IMAGETEXT = 'imageTextBlocks',
  CAROUSEL = 'carouselBlocks',
  SHOP = 'shopBlocks',
}

@Table({ tableName: 'multilinks', paranoid: true })
export class Multilink extends Model<Multilink, MultilinkCreationAttrs> {
  @ApiProperty({ example: '69', description: 'Unique ML ID' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'VasyaRaper', description: 'ML url name' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @ApiProperty({
    example: '[logo, text, image, social]',
    description: 'ML blocks structure',
  })
  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: false })
  contentMap: MLContentType[];

  @ApiProperty({ example: '#ff0', description: 'ML CSS background' })
  @Column({ type: DataType.STRING, allowNull: false })
  background: string;

  @ApiProperty({ example: '720', description: 'ML CSS maxWidth' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  maxWidth: number;

  @HasMany(() => MLText)
  textBlocks: MLText[];

  @HasMany(() => MLSocial)
  socialBlocks: MLSocial[];

  @HasMany(() => MLVideo)
  videoBlocks: MLVideo[];

  @HasMany(() => MLAudio)
  audioBlocks: MLAudio[];

  @HasMany(() => MLWidget)
  widgetBlocks: MLWidget[];

  @HasMany(() => MLPost)
  postBlocks: MLPost[];

  @HasMany(() => MLMap)
  mapBlocks: MLMap[];

  @HasMany(() => MLVote)
  voteBlocks: MLVote[];

  @HasMany(() => MLDivider)
  dividerBlocks: MLDivider[];

  // <image containing blocks>

  @HasMany(() => MLLogo)
  logoBlocks: MLLogo[];

  @HasMany(() => MLButton)
  buttonBlocks: MLButton[];

  @HasMany(() => MLLink)
  linkBlocks: MLLink[];

  @HasMany(() => MLImage)
  imageBlocks: MLImage[];

  @HasMany(() => MLImageText)
  imageTextBlocks: MLImageText[];

  @HasMany(() => MLCarousel)
  carouselBlocks: MLCarousel[];

  @HasMany(() => MLShop)
  shopBlocks: MLShop[];

  @HasMany(() => MLImageData)
  images: MLImageData[];

  @ApiProperty({ example: '69', description: 'ML customer clicks count' })
  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  clickCount: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
