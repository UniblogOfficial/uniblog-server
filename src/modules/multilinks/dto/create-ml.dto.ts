import { ApiProperty } from '@nestjs/swagger';

export class CreateMLDto {
  @ApiProperty({ example: 'VasyaRaper', description: 'Unique(!) ML name' })
  readonly name: string;

  @ApiProperty({ example: '#fff', description: 'Must be CSS background value' })
  readonly background: string;

  @ApiProperty({ example: '#fff', description: 'Must be CSS background value' })
  readonly outerBackground: string;

  @ApiProperty({ example: '1024', description: 'Max ML width in px' })
  readonly maxWidth: string;

  @ApiProperty({
    description: 'Array as string that representing ML content',
  })
  readonly contentMap: string; //TContentDTO[]

  readonly textBlocks: string;
  readonly socialBlocks: string;
  readonly mapBlocks: string;
  readonly widgetBlocks: string;
  readonly videoBlocks: string;
  readonly audioBlocks: string;
  readonly voteBlocks: string;
  readonly postBlocks: string;
  readonly dividerBlocks: string;

  readonly linkBlocks: string;
  readonly logoBlocks: string;
  readonly imageBlocks: string;
  readonly imageTextBlocks: string;
  readonly shopBlocks: string;
  readonly buttonBlocks: string;
  readonly carouselBlocks: string;
}
