import { ApiProperty } from '@nestjs/swagger';
import { ContentType, SocialNetwork } from '../model/mlcontent.model';

export class CreateMLDto {
  @ApiProperty({ example: 'VasyaRaper', description: 'Unique(!) ML name' })
  readonly name: string;

  @ApiProperty({
    description: 'Array that representing ML template',
    type: [String],
    isArray: true,
  })
  readonly template: string[];

  @ApiProperty({ example: '#fff', description: 'Must be CSS background value' })
  readonly background: string;

  @ApiProperty({
    description: 'Array that representing ML content',
    type: [String],
    isArray: true,
  })
  readonly content: string[]; //TContentDTO[]
}

type TContentDTO = {
  order: number;
  type: ContentType;
  link?: string;
  linkType?: SocialNetwork | 'third-party';
  title?: string;
  text?: string;
};
