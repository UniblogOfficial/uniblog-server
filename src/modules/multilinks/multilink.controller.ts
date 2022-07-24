import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import * as path from 'path';

import { MultilinkService } from 'modules/multilinks/multilink.service';

import { JwtAuthGuard } from 'modules/auth/guards/jwt-auth.guard';
import { ApiKeyGuard } from 'modules/auth/guards/api-key.guard';

import { Multilink } from 'modules/multilinks/model/multilink.model';
import { CreateMLDto } from 'modules/multilinks/dto/create-ml.dto';

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
    }),
  )
  create(@Req() request: any, @Body() dto: CreateMLDto) {
    return this.multilinkService.createMultilink(request.user, dto);
  }

  @ApiOperation({ summary: 'All user multilinks fetching' })
  @ApiResponse({ status: 200, type: Multilink })
  @UseGuards(JwtAuthGuard)
  @Get('/all')
  getAll(@Req() request: any) {
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
