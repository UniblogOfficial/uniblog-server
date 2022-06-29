import {
  UseGuards,
  Controller,
  Body,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiSecurity, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
import path from 'path';
import { ApiKeyGuard } from '../auth/api-key.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TImageFormData } from '../files/file.service';
import { CreateMLDto } from '../multilinks/dto/create-ml.dto';
import { ImageService } from './image.service';

@ApiTags('Image')
@ApiSecurity('API-KEY', ['API-KEY'])
@UseGuards(ApiKeyGuard)
@Controller('image')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @ApiOperation({ summary: 'Image saving' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 200, type: String })
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'image', maxCount: 1 }], {
      limits: {
        fileSize: 1024 * 10000, // is it 10mb?
      },
      fileFilter: (req: any, file: any, cb: any) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif|bmp)$/)) {
          cb(null, true);
        } else {
          cb(
            new HttpException(
              `Unsupported file type ${path.extname(file.originalname)}`,
              HttpStatus.BAD_REQUEST,
            ),
            false,
          );
        }
      },
    }),
  )
  save(
    @Req() request,
    @Body() dto: CreateMLDto,
    @UploadedFiles()
    image: TImageFormData,
  ) {
    return this.imageService.save(request.user, dto, image.image[0]);
  }
}
