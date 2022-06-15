import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Express } from 'express';

import * as path from 'path';
import { ApiConsumes, ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Multilink } from './model/multilink.model';
import { MultilinkService } from './multilink.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateMLDto } from './dto/create-ml.dto';
import { TMLImagesFormData } from '../files/file.service';
import { ApiKeyGuard } from '../auth/api-key.guard';

@ApiTags('Multilink')
@ApiSecurity('API-KEY', ['API-KEY'])
@UseGuards(ApiKeyGuard)
@Controller('multilink')
export class MultilinkController {
  constructor(private multilinkService: MultilinkService) {}

  @ApiOperation({ summary: 'Multilink creating' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 200, type: Multilink })
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'images', maxCount: 100 }], {
      limits: {
        fileSize: 1024 * 1000, // is it 1mb?
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
            const uploadPath = `dist/static/images/multilink/${req.user.id}/${req.body.name}`;
            // Create folder if doesn't exist
            if (!fs.existsSync(uploadPath)) {
              fs.mkdirSync(uploadPath, { recursive: true });
            }
            cb(null, uploadPath);
          },
          // File modification details
          filename: (req: any, file: any, cb: any) => {
            cb(null, `${file.fieldname}.${file.mimetype.split('/')[1]}`);
          },
        }), */
    }),
  )
  create(
    @Req() request,
    @Body() dto: CreateMLDto,
    @UploadedFiles()
    images: TMLImagesFormData,
  ) {
    return this.multilinkService.createMultilink(request.user, dto, images.images);
  }

  @ApiOperation({ summary: 'All user multilinks fetching' })
  @ApiResponse({ status: 200, type: Multilink })
  @UseGuards(JwtAuthGuard)
  @Get('/all')
  getAll(@Req() request) {
    return this.multilinkService.getMLsByUserId(request.user);
  }

  @ApiOperation({ summary: 'Multilink fetching (public)' })
  @ApiResponse({ status: 200, type: Multilink })
  @Get('/:name')
  getOne(@Param('name') name: string) {
    return this.multilinkService.getMLByName(name);
  }
}

/* export const multerOptions = {
  limits: {
    fileSize: 1024 * 1000, // is it 1mb?
  },
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      return cb(null, true);
    } else {
      return cb(
        new HttpException(
          `Unsupported file type ${extname(file.originalname)}`,
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },
  storage: diskStorage({
    // Destination storage path details
    destination: (req: any, file: any, cb: any) => {
      console.log('i working');
      const uploadPath = `.dist/images/multilink/${req.user.id}/${req.body.name}`;
      // Create folder if doesn't exist
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath);
      }
      return cb(null, uploadPath);
    },
    // File modification details
    filename: (req: any, file: any, cb: any) => {
      return cb(null, `${extname(file.fieldname)}`);
    },
  }),
}; */
