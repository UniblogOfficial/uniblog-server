import { SaveImageDto } from './dto/save-image.dto';
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
import path from 'path';
import { ApiKeyGuard } from '../auth/api-key.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TImageFormData } from '../files/file.service';
import { ImageService } from './image.service';
import { SavedImage } from './savedImage.model';

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
    @Req() request,
    @Body() dto: SaveImageDto,
    @UploadedFiles()
    image: TImageFormData,
  ) {
    return this.imageService.save(request.user, dto, image.image[0]);
  }

  @ApiOperation({ summary: 'All image fetching' })
  @ApiResponse({ status: 200, type: [SavedImage] })
  @UseGuards(JwtAuthGuard)
  @Get('/all')
  getAll(@Req() request) {
    return this.imageService.getAllByUserId(request.user);
  }
}
