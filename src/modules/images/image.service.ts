import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AxiosResponse } from 'axios';
import { lastValueFrom, map, Observable } from 'rxjs';

@Injectable()
export class ImageService {
  constructor(private httpService: HttpService) {}

  save(user, dto, file: Express.Multer.File) {
    const { order, type, suborder } = {
      order: +file.originalname.split('.')[0].split('_')[0],
      type: file.originalname.split('.')[0].split('_')[1],
      suborder: +file.originalname.split('.')[0].split('_')[2],
    };
  }

  private async saveImageData(
    file: Express.Multer.File,
  ): Promise<Observable<AxiosResponse<any, any>>> {
    const apiKey = process.env.IMG_HOST_API_KEY;
    const formData = new FormData();

    formData.append('key', apiKey);
    formData.append('image', file.path, file.originalname);
    const data = await lastValueFrom(
      this.httpService
        .post(`https://api.imgbb.com/1/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .pipe(map(res => res.data)),
    );
    return data;
    /* {
      "data": {
          "id": "qmZN216",
          "title": "logo-front",
          "url_viewer": "https://ibb.co/qmZN216",
          "url": "https://i.ibb.co/VMKgkB6/logo-front.png",
          "display_url": "https://i.ibb.co/VMKgkB6/logo-front.png",
          "width": "190",
          "height": "190",
          "size": 27222,
          "time": "1656441947",
          "expiration": "0",
          "image": {
              "filename": "logo-front.png",
              "name": "logo-front",
              "mime": "image/png",
              "extension": "png",
              "url": "https://i.ibb.co/VMKgkB6/logo-front.png"
          },
          "thumb": {
              "filename": "logo-front.png",
              "name": "logo-front",
              "mime": "image/png",
              "extension": "png",
              "url": "https://i.ibb.co/qmZN216/logo-front.png"
          },
          "delete_url": "https://ibb.co/qmZN216/d23ddd7717398647eded9ac5421f19af"
      },
      "success": true,
      "status": 200
  } */
  }
}
