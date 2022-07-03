import { MLContentType } from '../multilink.model';

export interface IMLTextCreationAttrs extends IMLAnyBlockCreationAttrs, IMLTextProperties {
  type: MLContentType.TEXT;

  text: string;
  textType?: 'plain' | 'list';
  href?: string;
  icon?: string;
  iconPosition?: 'sticky' | 'aside';
  iconSide?: 'right' | 'left';
}

export interface IMLSocialCreationAttrs extends Omit<IMLAnyBlockCreationAttrs, 'borderRadius'> {
  type: MLContentType.SOCIAL;

  links: string[];
  linkTypes: SocialNetwork[];
  size: number;
  rows?: string;
  columns?: string;
}

export interface IMLVideoCreationAttrs extends Omit<IMLAnyBlockCreationAttrs, 'borderRadius'> {
  type: MLContentType.VIDEO;

  url: string;
  width: number;
  height: number;
}

export interface IMLAudioCreationAttrs extends Omit<IMLAnyBlockCreationAttrs, 'borderRadius'> {
  type: MLContentType.AUDIO;

  url: string;
}

export interface IMLWidgetCreationAttrs extends Omit<IMLAnyBlockCreationAttrs, 'borderRadius'> {
  type: MLContentType.WIDGET;

  url: string;
  width: number;
  height: number;
}

export interface IMLMapCreationAttrs extends Omit<IMLAnyBlockCreationAttrs, 'borderRadius'> {
  type: MLContentType.MAP;

  url: string;
  latLng: [number, number];
}

export interface IMLPostCreationAttrs extends Omit<IMLAnyBlockCreationAttrs, 'borderRadius'> {
  type: MLContentType.POST;

  url: string;
}

export interface IMLVoteCreationAttrs
  extends Omit<IMLAnyBlockCreationAttrs, 'borderRadius'>,
    IMLTextProperties {
  type: MLContentType.VOTE;

  titleBackground?: string;
  titleBorderRadius?: number[];
  buttonBackground?: string;
  buttonBorderRadius?: number[];
  buttonColor?: string;
  buttonFont?: string;
  buttonLetterSpacing?: number;
  buttonTextShadow?: string[];
  buttonTextAlign?: 'right' | 'left' | 'center' | 'justify';
}

export interface IMLDividerCreationAttrs extends Omit<IMLAnyBlockCreationAttrs, 'borderRadius'> {
  type: MLContentType.DIVIDER;

  icon?: string;
  primaryColor?: string;
  secondaryColor?: string;
  primaryOpacity?: string;
  secondaryOpacity?: string;
  line?: 'solid' | 'faded';
  lineColor?: string;
}

export interface IMLButtonCreationAttrs extends IMLAnyBlockCreationAttrs, IMLTextProperties {
  type: MLContentType.BUTTON;

  href: string;
  title: string;
  image?: string;
}

export interface IMLLogoCreationAttrs extends Omit<IMLAnyBlockCreationAttrs, 'borderRadius'> {
  type: MLContentType.LOGO;

  logo: string;
  banner?: string;
  size?: number;
  hAlign?: string;
  vAlign?: string;
}

export interface IMLLinkCreationAttrs extends IMLAnyBlockCreationAttrs, IMLTextProperties {
  type: MLContentType.LINK;

  href: string;
  linkType: SocialNetwork | SocialService | 'third-party';
  title: string;
  image: string;
}

export interface IMLImageCreationAttrs extends IMLAnyBlockCreationAttrs, IMLTextProperties {
  type: MLContentType.IMAGE;

  image: string;
  title?: string;
  href?: string;
  imgPosition?: 'top' | 'bottom';
  textPosition?: 'inside' | 'outside';
}

export interface IMLImageTextCreationAttrs
  extends IMLAnyBlockCreationAttrs,
    Omit<IMLTextProperties, 'textAlign'> {
  type: MLContentType.IMAGETEXT;

  text: string;
  image: string;
  imgPosition: 'right' | 'left';
  hAlign?: 'right' | 'left' | 'center' | 'justify';
  vAlign?: 'top' | 'center' | 'bottom';
}

export interface IMLCarouselCreationAttrs extends Omit<IMLAnyBlockCreationAttrs, 'borderRadius'> {
  type: MLContentType.CAROUSEL;

  images: string[];
  dots?: boolean;
  arrows?: boolean;
  swipe?: boolean;
  interval?: number;
}

export interface IMLShopCreationAttrs extends IMLAnyBlockCreationAttrs, IMLTextProperties {
  type: MLContentType.SHOP;

  grid: string;
  gap?: number;

  subtitleColor?: string;
  subtitleFont?: string;
  subtitleLetterSpacing?: number;
  subtitleTextShadow?: string[];
  subtitleTextAlign?: 'right' | 'left' | 'center' | 'justify';

  descriptionColor?: string;
  descriptionFont?: string;
  descriptionLetterSpacing?: number;
  descriptionTextShadow?: string[];
  descriptionTextAlign?: 'right' | 'left' | 'center' | 'justify';

  priceColor?: string;
  priceFont?: string;
  priceLetterSpacing?: number;
  priceTextShadow?: string[];
  priceTextAlign?: 'right' | 'left' | 'center' | 'justify';

  buttonBackground?: string;
  buttonBorderRadius?: number[];
  buttonColor?: string;
  buttonFont?: string;
  buttonLetterSpacing?: number;
  buttonTextShadow?: string[];
  buttonTextAlign?: 'right' | 'left' | 'center' | 'justify';
}

// ================================================================================

export interface IMLAnyBlockCreationAttrs {
  multilinkId: number;
  order: number;

  padding?: number[];
  margin?: number[];
  background?: string;
  borderRadius?: number[];
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
  textAlign?: 'right' | 'left' | 'center' | 'justify';
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
