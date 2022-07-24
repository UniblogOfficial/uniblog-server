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
  Get,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiSecurity, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SavedImage } from '@prisma/client';
import path from 'path';

import { ImageService } from 'modules/images/image.service';

import { ApiKeyGuard } from 'modules/auth/guards/api-key.guard';
import { JwtAuthGuard } from 'modules/auth/guards/jwt-auth.guard';

import { SaveImageDto } from 'modules/images/dto/save-image.dto';
import { TImageFormData } from 'modules/files/file.service';

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
      fileFilter: (_, file: any, cb: any) => {
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
      /* storage: diskStorage({
        // Destination storage path details
        destination: (req: any, file: any, cb: any) => {
          const uploadPath = `dist/static/images/${req.user.id}`;
          // Create folder if doesn't exist
          if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
          }
          cb(null, uploadPath);
        },
        // File modification details
        filename: (req: any, file: any, cb: any) => {
          cb(null, `${file.originalname}`);
        },
      }), */
    }),
  )
  save(
    @Req() request: any,
    @Body() dto: SaveImageDto,
    @UploadedFiles()
    image: TImageFormData,
  ) {
    return this.imageService.save(request.user, dto, image.image[0]);
  }

  @ApiOperation({ summary: 'All image fetching' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Get('/all')
  getAll(@Req() request: any): Promise<SavedImage[]> {
    return this.imageService.getAll(request.user.id);
  }
}
