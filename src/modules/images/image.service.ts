/* eslint-disable @typescript-eslint/ban-ts-comment */
import { MLContentType } from './../multilinks/model/multilink.model';
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AxiosResponse } from 'axios';
import { lastValueFrom, map, Observable } from 'rxjs';
import { SavedImage } from './savedImage.model';
import FormData = require('form-data');

export interface File extends Blob {
  readonly lastModified: number;
  readonly name: string;
}

@Injectable()
export class ImageService {
  constructor(
    @InjectModel(SavedImage) private savedImageRepository: typeof SavedImage,
    private httpService: HttpService,
  ) {}

  async save(user, dto, file: Express.Multer.File) {
    const { order, type, suborder } = {
      type: file.originalname.split('.')[0].split('-')[0] as MLContentType,
      order: +file.originalname.split('.')[0].split('-')[1],
      suborder: +file.originalname.split('.')[0].split('-')[2],
    };
    let response;
    try {
      response = await this.saveImageData(file);
    } catch (e) {
      throw new HttpException(
        'Image processing error: ' + e.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    if (response) {
      const { image, thumb } = response as TImageHostResponseData;
      const { extension, filename, mime, name, url } = image;
      this.savedImageRepository.create({
        userId: user.id,
        extension,
        filename,
        mime,
        name,
        type,
        url,
        thumbUrl: thumb.url,
      });
    }

    return { data: response, message: 'Image saved' };
  }

  async getAllByUserId(user) {
    try {
      const images = await this.savedImageRepository.findAll({ where: { userId: user.id } });
      if (images.length) {
        return { data: images, message: 'Here is your saved images!' };
      }
      return { data: null, message: 'There is no saved images' };
    } catch (e) {}
  }

  private async saveImageData(
    multerFile: Express.Multer.File,
  ): Promise<Observable<AxiosResponse<any, any>>> {
    const apiKey = process.env.IMG_HOST_API_KEY;
    const formData = new FormData({ writable: true, readable: true });
    formData.append('key', apiKey);
    formData.append('name', multerFile.originalname.split('.')[0]);
    formData.append('image', multerFile.buffer, multerFile.originalname.split('.')[0]);

    console.log(multerFile);

    try {
      const response = await lastValueFrom(
        this.httpService
          .post(`https://api.imgbb.com/1/upload?key=${apiKey}`, formData, {
            headers: {
              // @ts-ignore
              'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            },
          })
          .pipe(map(res => res.data)),
      );
      return response.data;
    } catch (e) {
      console.log(e.response?.data);
      throw new HttpException(
        'hosting error - ' + e.message + ' - ' + e.response?.data?.error?.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

type TImageHostResponse = {
  data: TImageHostResponseData;
  success: boolean; // true;
  status: number; // 200;
};

type TImageHostResponseData = {
  id: string; // 'qmZN216';
  title: string; // 'logo-front';
  url_viewer: string; // 'https://ibb.co/qmZN216';
  url: string; // 'https://i.ibb.co/VMKgkB6/logo-front.png';
  display_url: string; // 'https://i.ibb.co/VMKgkB6/logo-front.png';
  width: string; // '190';
  height: string; // '190';
  size: number; // 27222;
  time: string; // '1656441947';
  expiration: string; // '0';
  image: {
    filename: string; // 'logo-front.png';
    name: string; // 'logo-front';
    mime: string; // 'image/png';
    extension: string; // 'png';
    url: string; // 'https://i.ibb.co/VMKgkB6/logo-front.png';
  };
  thumb: {
    filename: string; // 'logo-front.png';
    name: string; // 'logo-front';
    mime: string; // 'image/png';
    extension: string; // 'png';
    url: string; // 'https://i.ibb.co/qmZN216/logo-front.png';
  };
  delete_url: string; // 'https://ibb.co/qmZN216/d23ddd7717398647eded9ac5421f19af';
};
