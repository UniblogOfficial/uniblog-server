import { MLContent } from './model/mlcontent.model';
import { Multilink } from './model/multilink.model';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateMLDto } from './dto/create-ml.dto';
import { MLLogo } from './model/mllogo.model';
import { TImagesFormData } from '../files/file.service';

@Injectable()
export class MultilinkService {
  constructor(
    @InjectModel(Multilink) private multilinkRepository: typeof Multilink,
    @InjectModel(MLContent) private mlContentRepository: typeof MLContent,
    @InjectModel(MLLogo) private mlLogoRepository: typeof MLLogo,
  ) {}

  async createMultilink(user, dto: CreateMLDto, images: TImagesFormData) {
    try {
      let multilink = await this.multilinkRepository.findOne({ where: { userId: user.id } });
      // <multilink root data>
      const mlRootData = {
        name: dto.name,
        template: dto.template.map(t => +t),
        background: dto.background,
      };

      if (!multilink) {
        multilink = await this.multilinkRepository.create({
          userId: user.id,
          ...mlRootData,
        });
      } else {
        await this.multilinkRepository.update(
          { ...mlRootData },
          { where: { id: multilink.id }, returning: true },
        );
      }
      // </multilink root data>
      // <multilink logo>
      await this.mlLogoRepository.destroy({ where: { multilinkId: multilink.id } });
      let logo = null;
      if (images.logo.length) {
        logo = await this.mlLogoRepository.create({
          multilinkId: multilink.id,
          imageType: images.logo[0].mimetype,
          imageData: images.logo[0].buffer,
        });
      }
      // </multilink logo>
      // <multilink content>
      await this.mlContentRepository.destroy({ where: { multilinkId: multilink.id } });
      const content = await Promise.all(
        dto.content.map(async (content, i) => {
          const parsedContent = JSON.parse(content);
          const imageRawData = images[`order${i}`]
            ? (images[`order${i}`][0] as Express.Multer.File)
            : undefined;
          const image = imageRawData
            ? {
                imageType: imageRawData.mimetype,
                imageName: `order${i}`,
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
      // </multilink content>
      return { data: { multilink, content, logo }, message: 'Multilink created' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getMLByName(name: string) {
    try {
      const multilink = await this.multilinkRepository.findOne({
        where: { name },
        include: { all: true },
      });
      return multilink;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async getMLsByUserId(user) {
    try {
      const multilinks = await this.multilinkRepository.findAll({
        where: { userId: user.id },
        include: { all: true },
      });
      return { data: { multilinks }, message: 'Here all your stuff, sir' };
    } catch (error) {
      throw new HttpException(`DB Error: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
