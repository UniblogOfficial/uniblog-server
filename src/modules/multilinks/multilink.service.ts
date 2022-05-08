import { MLContent } from './model/mlcontent.model';
import { Multilink } from './model/multilink.model';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateMLDto } from './dto/create-ml.dto';
import { TImagesFormData } from './multilink.controller';

@Injectable()
export class MultilinkService {
  constructor(
    @InjectModel(Multilink) private multilinkRepository: typeof Multilink,
    @InjectModel(MLContent) private mlContentRepository: typeof MLContent,
  ) {}

  async createMultilink(user, dto: CreateMLDto, images: TImagesFormData) {
    try {
      console.log(images[`order${1}`][0]);
      let multilink = await this.multilinkRepository.findOne({ where: { userId: user.id } });
      if (!multilink) {
        multilink = await this.multilinkRepository.create({
          userId: user.id,
          name: dto.name,
          template: dto.template.map(t => +t),
          background: dto.background,
        });
      }
      await this.mlContentRepository.destroy({ where: { multilinkId: multilink.id } });
      const content = await Promise.all(
        dto.content.map(async (content, i) => {
          const parsedContent = JSON.parse(content);
          const imageRawData = images[`order${i + 1}`]
            ? (images[`order${i + 1}`][0] as Express.Multer.File)
            : undefined;
          const image = imageRawData
            ? {
                imageType: imageRawData.mimetype,
                imageName: `order${i + 1}`,
                imageData: imageRawData.buffer,
              }
            : undefined;
          const dbreq = image
            ? {
                ...parsedContent,
                ...image,
                multilinkId: multilink.id,
              }
            : { ...parsedContent, multilinkId: multilink.id };
          return await this.mlContentRepository.create(dbreq);
        }),
      );
      return { data: { multilink, content } };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getMLByName(name: string) {
    const ml = await this.multilinkRepository.findOne({ where: { name }, include: { all: true } });
    return ml;
  }
}
