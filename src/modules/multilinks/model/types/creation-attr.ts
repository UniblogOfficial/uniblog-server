import { MLContentType } from '../multilink.model';

export interface IMLTextCreationAttributes
  extends IMLAnyBlockCreationAttributes,
    IMLTextProperties {
  type: MLContentType.TEXT;

  text: string;
  textType?: 'plain' | 'list';
  href?: string;
  icon?: string;
  iconPosition?: 'sticky' | 'aside';
  iconSide?: 'right' | 'left';
}

export interface IMLSocialCreationAttributes
  extends Omit<IMLAnyBlockCreationAttributes, 'borderRadius'> {
  type: MLContentType.SOCIAL;

  links: string[];
  linkTypes: SocialNetwork[];
  size: number;
  rows?: string;
  columns?: string;
}

export interface IMLVideoCreationAttributes
  extends Omit<IMLAnyBlockCreationAttributes, 'borderRadius'> {
  type: MLContentType.VIDEO;

  url: string;
  width: number;
  height: number;
}

export interface IMLAudioCreationAttributes
  extends Omit<IMLAnyBlockCreationAttributes, 'borderRadius'> {
  type: MLContentType.AUDIO;

  url: string;
}

export interface IMLWidgetCreationAttributes
  extends Omit<IMLAnyBlockCreationAttributes, 'borderRadius'> {
  type: MLContentType.WIDGET;

  url: string;
  width: number;
  height: number;
}

export interface IMLMapCreationAttributes
  extends Omit<IMLAnyBlockCreationAttributes, 'borderRadius'> {
  type: MLContentType.MAP;

  url: string;
  latLng: [number, number];
}

export interface IMLPostCreationAttributes
  extends Omit<IMLAnyBlockCreationAttributes, 'borderRadius'> {
  type: MLContentType.POST;

  url: string;
}

export interface IMLVoteCreationAttributes
  extends Omit<IMLAnyBlockCreationAttributes, 'borderRadius'>,
    IMLTextProperties {
  type: MLContentType.VOTE;

  titleBackground?: string;
  titleBorderRadius?: number;
  buttonBackground?: string;
  buttonBorderRadius?: number;
  buttonColor?: string;
  buttonFont?: string;
  buttonLetterSpacing?: number;
  buttonTextShadow?: string[];
  buttonAlign?: 'right' | 'left' | 'center' | 'justify';
}

export interface IMLDividerCreationAttributes
  extends Omit<IMLAnyBlockCreationAttributes, 'borderRadius'> {
  type: MLContentType.DIVIDER;

  icon?: string;
  primaryColor?: string;
  secondaryColor?: string;
  primaryOpacity?: string;
  secondaryOpacity?: string;
  line?: 'solid' | 'faded';
  lineColor?: string;
}

export interface IMLButtonCreationAttributes
  extends IMLAnyBlockCreationAttributes,
    IMLTextProperties {
  type: MLContentType.BUTTON;

  href: string;
  title: string;
  image?: string;
}

export interface IMLLogoCreationAttributes
  extends Omit<IMLAnyBlockCreationAttributes, 'borderRadius'> {
  type: MLContentType.LOGO;

  logo: string;
  banner?: string;
  size?: number;
  hAlign?: string;
  vAlign?: string;
}

export interface IMLLinkCreationAttributes
  extends IMLAnyBlockCreationAttributes,
    IMLTextProperties {
  type: MLContentType.LINK;

  href: string;
  linkType: SocialNetwork | SocialService | 'third-party';
  title: string;
  image: string;
}

export interface IMLImageCreationAttributes
  extends IMLAnyBlockCreationAttributes,
    IMLTextProperties {
  type: MLContentType.IMAGE;

  image: string;
  title?: string;
  href?: string;
  imgPosition?: 'top' | 'bottom';
  textPosition?: 'inside' | 'outside';
}

export interface IMLImageTextCreationAttributes
  extends IMLAnyBlockCreationAttributes,
    Omit<IMLTextProperties, 'align'> {
  type: MLContentType.IMAGETEXT;

  text: string;
  image: string;
  imgPosition: 'right' | 'left';
  hAlign?: 'right' | 'left' | 'center' | 'justify';
  vAlign?: 'top' | 'center' | 'bottom';
}

export interface IMLCarouselCreationAttributes
  extends Omit<IMLAnyBlockCreationAttributes, 'borderRadius'> {
  type: MLContentType.CAROUSEL;

  images: string[];
  dots?: boolean;
  arrows?: boolean;
  swipe?: boolean;
  interval?: number;
}

export interface IMLShopCreationAttributes
  extends IMLAnyBlockCreationAttributes,
    IMLTextProperties {
  type: MLContentType.SHOP;

  grid: string;
  gap?: number;

  subtitleColor?: string;
  subtitleFont?: string;
  subtitleLetterSpacing?: number;
  subtitleTextShadow?: string[];
  subtitleAlign?: 'right' | 'left' | 'center' | 'justify';

  descriptionColor?: string;
  descriptionFont?: string;
  descriptionLetterSpacing?: number;
  descriptionTextShadow?: string[];
  descriptionAlign?: 'right' | 'left' | 'center' | 'justify';

  priceColor?: string;
  priceFont?: string;
  priceLetterSpacing?: number;
  priceTextShadow?: string[];
  priceAlign?: 'right' | 'left' | 'center' | 'justify';

  buttonBackground?: string;
  buttonBorderRadius?: number;
  buttonColor?: string;
  buttonFont?: string;
  buttonLetterSpacing?: number;
  buttonTextShadow?: string[];
  buttonAlign?: 'right' | 'left' | 'center' | 'justify';
}

// ================================================================================

interface IMLAnyBlockCreationAttributes {
  multilinkId: number;
  order: number;

  padding?: number[];
  margin?: number[];
  background?: string;
  borderRadius?: number;
}

interface IMLTextProperties {
  color?: string;
  // font must contain size & family;
  // all props: font-style font-variant font-weight font-size/line-height font-family
  // exm. #1: italic small-caps bold 12px/30px Georgia, serif;
  // exm. #2: 20px Arial, sans-serif; <= required
  font?: string;
  letterSpacing?: number;
  textShadow?: string[]; // 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue;
  align?: 'right' | 'left' | 'center' | 'justify';
}

export enum SocialNetwork {
  VK = 'vk',
  YOUTUBE = 'youtube',
  INSTAGRAM = 'instagram',
  TELEGRAM = 'telegram',
  TIKTOK = 'tiktok',
  TWITTER = 'twitter',
  FACEBOOK = 'facebook',
  PINTEREST = 'pinterest',
}

export enum SocialService {
  BOOSTY = 'boosty',
  DISCORD = 'discord',
  PATREON = 'patreon',
  TWITCH = 'twitch',
}
