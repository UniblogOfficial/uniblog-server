import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

export type TUserAvatarFormData = {
  avatar: Express.Multer.File[];
};

export type TMLImagesFormData = {
  images: Express.Multer.File[];
};

export type TImageFormData = {
  image: Express.Multer.File[];
};

@Injectable()
export class FileService {
  create(file: any): string {
    try {
      const fileName = uuid.v4() + '.' + file.type.split('/')[1];
      const filePath = path.resolve(__dirname, '..', '..', 'static');

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      fs.writeFileSync(path.join(filePath, fileName), file.buffer);

      return fileName;
    } catch (error) {
      throw new HttpException('Error while file recording', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
