import { ApiProperty } from '@nestjs/swagger';

export class CreateMLDto {
  @ApiProperty({ example: 'VasyaRaper', description: 'Unique(!) ML name' })
  readonly name: string;

  @ApiProperty({ example: '#fff', description: 'Must be CSS background value' })
  readonly background: string;

  @ApiProperty({
    description: 'Array as string that representing ML content',
  })
  readonly contentSet: string; //TContentDTO[]

  readonly textSet: string;
  readonly linkSet: string;
  readonly socialSet: string;
  readonly logoSet: string;
  readonly imageSet: string;
  readonly imageTextSet: string;
  readonly videoSet: string;
  readonly shopSet: string;
}
