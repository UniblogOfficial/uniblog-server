import { MLImageData } from './model/images/ml-imagedata.model';
import { MLShopCell } from './model/blocks/shop/shop-cell.model';
import { MLShop } from './model/blocks/shop/shop.model';
import { MLVideo } from './model/blocks/video.model';
import { MLLink } from './model/blocks/link.model';
import { MLImageText } from './model/blocks/imagetext.model';
import { MLImage } from './model/blocks/image.model';
import { MLSocial } from './model/blocks/social.model';
import { MLText } from './model/blocks/text.model';
import { MLContentType, Multilink } from './model/multilink.model';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateMLDto } from './dto/create-ml.dto';
import { MLLogo } from './model/blocks/logo.model';
import { Avatar } from '../users/model/avatar.model';

@Injectable()
export class MultilinkService {
  constructor(
    @InjectModel(Multilink) private multilinkRepository: typeof Multilink,
    //
    @InjectModel(MLLogo) private mlLogoRepository: typeof MLLogo,
    @InjectModel(MLText) private mlTextRepository: typeof MLText,
    @InjectModel(MLSocial) private mlSocialRepository: typeof MLSocial,
    @InjectModel(MLImage) private mlImageRepository: typeof MLImage,
    @InjectModel(MLImageText) private mlImageTextRepository: typeof MLImageText,
    @InjectModel(MLLink) private mlLinkRepository: typeof MLLink,
    @InjectModel(MLVideo) private mlVideoRepository: typeof MLVideo,
    @InjectModel(MLShop) private mlShopRepository: typeof MLShop,
    //
    @InjectModel(MLShopCell) private mlShopCellRepository: typeof MLShopCell,
    //
    @InjectModel(MLImageData) private mlImageDataRepository: typeof MLImageData,
    @InjectModel(Avatar) private avatarRepository: typeof Avatar,
  ) {}

  async createMultilink(user, dto: CreateMLDto, images: Express.Multer.File[]) {
    const {
      logoBlocks,
      textBlocks,
      linkBlocks,
      socialBlocks,
      imageBlocks,
      imageTextBlocks,
      shopBlocks,
      videoBlocks,
    } = dto;
    const parsedSets = {
      logoBlocks: JSON.parse(logoBlocks),
      textBlocks: JSON.parse(textBlocks),
      linkBlocks: JSON.parse(linkBlocks),
      socialBlocks: JSON.parse(socialBlocks),
      imageBlocks: JSON.parse(imageBlocks),
      imageTextBlocks: JSON.parse(imageTextBlocks),
      shopBlocks: JSON.parse(shopBlocks),
      videoBlocks: JSON.parse(videoBlocks),
    };

    try {
      /* let multilink = await this.multilinkRepository.findOne({
        where: { userId: user.id, name: dto.name },
      }); */
      await this.multilinkRepository.destroy({
        where: { userId: user.id, name: dto.name },
        force: true,
      });
      // <multilink root data>
      const mlRootData = {
        name: dto.name,
        background: dto.background,
        contentMap: JSON.parse(dto.contentMap),
      };

      const multilink = await this.multilinkRepository.create({
        userId: user.id,
        ...mlRootData,
      });
      const multilinkId = multilink.id;
      const logoOrders = [];
      // </multilink root data>
      // <multilink content>
      if (parsedSets.textBlocks.length) {
        parsedSets.textBlocks.map(async block => {
          await this.mlTextRepository.create({ multilinkId, ...block });
        });
      }
      if (parsedSets.logoBlocks.length) {
        parsedSets.logoBlocks.map(async block => {
          logoOrders.push(block.order);
          await this.mlLogoRepository.create({ multilinkId, ...block, logo: '' });
        });
      }
      if (parsedSets.socialBlocks.length) {
        parsedSets.socialBlocks.map(async block => {
          await this.mlSocialRepository.create({ multilinkId, ...block });
        });
      }
      if (parsedSets.linkBlocks.length) {
        parsedSets.linkBlocks.map(async block => {
          await this.mlLinkRepository.create({ multilinkId, ...block });
        });
      }
      if (parsedSets.imageBlocks.length) {
        parsedSets.imageBlocks.map(async block => {
          await this.mlImageRepository.create({ multilinkId, ...block });
        });
      }
      if (parsedSets.imageTextBlocks.length) {
        parsedSets.imageTextBlocks.map(async block => {
          await this.mlImageTextRepository.create({ multilinkId, ...block, image: '' });
        });
      }
      if (parsedSets.videoBlocks.length) {
        parsedSets.videoBlocks.map(async block => {
          await this.mlVideoRepository.create({ multilinkId, ...block });
        });
      }
      if (parsedSets.shopBlocks.length) {
        parsedSets.shopBlocks.map(async block => {
          const shopBlock = await this.mlShopRepository.create({ multilinkId, ...block });
          await Promise.all(
            block.cells.map(cell => {
              return this.mlShopCellRepository.create({
                blockId: shopBlock.id,
                ...cell,
                image: '',
              });
            }),
          );
        });
      }
      // </multilink content>
      // <multilink images>
      let logo: Promise<MLImageData>;
      await Promise.all(
        images.map(file => {
          const { order, type, suborder } = {
            order: +file.originalname.split('.')[0].split('_')[0],
            type: file.originalname.split('.')[0].split('_')[1],
            suborder: +file.originalname.split('.')[0].split('_')[2],
          };

          switch (type) {
            case 'logo':
              if (suborder === 0) {
                logo = this.mlImageDataRepository.create({
                  multilinkId,
                  type: MLContentType.LOGO,
                  order,
                  suborder,
                  imageName: file.originalname.split('.')[0],
                  imageType: file.mimetype,
                  imageData: file.buffer,
                });
                return logo;
              }
              // banner
              if (suborder === 1) {
                return this.mlImageDataRepository.create({
                  multilinkId,
                  type: MLContentType.LOGO,
                  order,
                  suborder,
                  imageName: file.originalname.split('.')[0],
                  imageType: file.mimetype,
                  imageData: file.buffer,
                });
              }
            case 'image':
              return this.mlImageDataRepository.create({
                multilinkId,
                type: MLContentType.IMAGE,
                order,
                suborder,
                imageName: file.originalname.split('.')[0],
                imageType: file.mimetype,
                imageData: file.buffer,
              });
            case 'imagetext':
              return this.mlImageDataRepository.create({
                multilinkId,
                type: MLContentType.IMAGETEXT,
                order,
                suborder,
                imageName: file.originalname.split('.')[0],
                imageType: file.mimetype,
                imageData: file.buffer,
              });
            case 'shop':
              return this.mlImageDataRepository.create({
                multilinkId,
                type: MLContentType.SHOP,
                order,
                suborder,
                imageName: file.originalname.split('.')[0],
                imageType: file.mimetype,
                imageData: file.buffer,
              });
          }
          if (file.originalname.split('.')[0] === 'backgroundImage') {
            return this.mlImageDataRepository.create({
              multilinkId,
              type: 'backgroundImage',
              order: 9999,
              suborder: 0,
              imageName: file.originalname.split('.')[0],
              imageType: file.mimetype,
              imageData: file.buffer,
            });
          }
        }),
      );
      if (!logo && logoOrders.length) {
        const avatar = await this.avatarRepository.findOne({
          where: { userId: user.id },
        });
        if (avatar) {
          logoOrders.forEach(async order => {
            await this.mlImageDataRepository.create({
              multilinkId: multilink.id,
              type: MLContentType.LOGO,
              order,
              suborder: 1,
              imageName: 'avatar',
              imageType: avatar.imageType,
              imageData: avatar.imageData,
            });
          });
        }
      }
      // </multilink images>
      const createdML = await this.multilinkRepository.findByPk(multilink.id, {
        include: { all: true, nested: true },
      });

      return {
        data: { multilink: createdML },
        message: 'Multilink created',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getMLByName(name: string) {
    try {
      const multilink = await this.multilinkRepository.findOne({
        where: { name },
        include: { all: true, nested: true },
      });
      multilink.clickCount++;
      multilink.save();
      return { data: { multilink }, message: 'Here we go' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async getMLsByUserId(user) {
    try {
      const multilinks = await this.multilinkRepository.findAll({
        where: { userId: user.id },
        include: { all: true, nested: true },
      });
      return { data: { multilinks }, message: 'Here all your stuff, sir' };
    } catch (error) {
      throw new HttpException(`DB Error: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
