import { ContentType, SocialNetwork } from '../model/mlcontent.model';

export class CreateMLDto {
  name: string;
  template: string[];
  background: string;
  content: string[]; //TContentDTO[]
}

type TContentDTO = {
  order: number;
  type: ContentType;
  link?: string;
  linkType?: SocialNetwork | 'third-party';
  title?: string;
  text?: string;
};
