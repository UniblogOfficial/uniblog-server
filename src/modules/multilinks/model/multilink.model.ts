import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

import { User } from 'modules/users/user.model';
import { MLLogo } from 'modules/multilinks/model/blocks/logo.model';
import { MLLink } from 'modules/multilinks/model/blocks/link.model';
import { MLSocial } from 'modules/multilinks/model/blocks/social.model';
import { MLText } from 'modules/multilinks/model/blocks/text.model';
import { MLVideo } from 'modules/multilinks/model/blocks/video.model';
import { MLImage } from 'modules/multilinks/model/blocks/image.model';
import { MLImageText } from 'modules/multilinks/model/blocks/imagetext.model';
import { MLShop } from 'modules/multilinks/model/blocks/shop/shop.model';
import { MLAudio } from 'modules/multilinks/model/blocks/audio.model';
import { MLButton } from 'modules/multilinks/model/blocks/button.model';
import { MLCarousel } from 'modules/multilinks/model/blocks/carousel.model';
import { MLDivider } from 'modules/multilinks/model/blocks/divider.model';
import { MLMap } from 'modules/multilinks/model/blocks/map.model';
import { MLPost } from 'modules/multilinks/model/blocks/post.model';
import { MLVote } from 'modules/multilinks/model/blocks/vote/vote.model';
import { MLWidget } from 'modules/multilinks/model/blocks/widget.model';
import { MLTimer } from 'modules/multilinks/model/blocks/timer.model';
import { MLFeedback } from 'modules/multilinks/model/blocks/feedback.model';
import { MLImageData } from 'modules/multilinks/model/images/ml-imagedata.model';

interface MultilinkCreationAttrs {
  name: string;
  background: string;
  outerBackground?: string;
  maxWidth: number;
  contentMap: MLContentType[];
  userId: number;
}

export enum MLContentType {
  TEXT = 'text',
  SOCIAL = 'social',
  WIDGET = 'widget',
  VIDEO = 'video',
  AUDIO = 'audio',
  POST = 'post',
  VOTE = 'vote',
  MAP = 'map',
  FEEDBACK = 'feedback',
  DIVIDER = 'divider',

  LINK = 'link',
  LOGO = 'logo',
  BUTTON = 'button',
  IMAGE = 'image',
  IMAGETEXT = 'imageText',
  CAROUSEL = 'carousel',
  TIMER = 'timer',
  SHOP = 'shop',
}

@Table({ tableName: 'multilinks', paranoid: true })
export class Multilink
  extends Model<Multilink, MultilinkCreationAttrs>
  implements MultilinkCreationAttrs
{
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

  @ApiProperty({ example: '#ff0', description: 'ML CSS outer background' })
  @Column({ type: DataType.STRING })
  outerBackground: string;

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

  @HasMany(() => MLFeedback)
  feedbackBlocks: MLFeedback[];

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

  @HasMany(() => MLTimer)
  timerBlocks: MLTimer[];

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
