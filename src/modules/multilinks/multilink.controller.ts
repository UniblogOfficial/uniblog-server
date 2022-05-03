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
import * as fs from 'fs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Multilink } from './model/multilink.model';
import { MultilinkService } from './multilink.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateMLDto } from './dto/create-ml.dto';
import { diskStorage } from 'multer';

@ApiTags('Multilink')
@Controller('multilink')
export class MultilinkController {
  constructor(private multilinkService: MultilinkService) {}

  @ApiOperation({ summary: 'Multilink creating' })
  @ApiResponse({ status: 200, type: [Multilink] })
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'order1', maxCount: 1 },
        { name: 'order2', maxCount: 1 },
        { name: 'order3', maxCount: 1 },
        { name: 'order4', maxCount: 1 },
        { name: 'order5', maxCount: 1 },
        { name: 'order6', maxCount: 1 },
        { name: 'order7', maxCount: 1 },
        { name: 'order8', maxCount: 1 },
        { name: 'order9', maxCount: 1 },
        { name: 'order10', maxCount: 1 },
      ],
      {
        limits: {
          fileSize: 1024 * 1000, // is it 1mb?
        },
        fileFilter: (req: any, file: any, cb: any) => {
          if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
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
        storage: diskStorage({
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
        }),
      },
    ),
  )
  create(
    @Req() request,
    @Body() dto: CreateMLDto,
    @UploadedFiles()
    images: {
      order1?: Express.Multer.File[];
      order2?: Express.Multer.File[];
      order3?: Express.Multer.File[];
      order4?: Express.Multer.File[];
      order5?: Express.Multer.File[];
      order6?: Express.Multer.File[];
      order7?: Express.Multer.File[];
      order8?: Express.Multer.File[];
      order9?: Express.Multer.File[];
      order10?: Express.Multer.File[];
    },
  ) {
    return this.multilinkService.createMultilink(request.user, dto, images);
  }

  @ApiOperation({ summary: 'All multilinks fetching' })
  @ApiResponse({ status: 200, type: [Multilink] })
  @Get('/:name')
  get(@Param('name') name: string) {
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
