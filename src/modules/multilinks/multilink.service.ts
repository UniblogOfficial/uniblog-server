import { MLFeedback } from './model/blocks/feedback.model';
import { getKeys } from './../../common/utils';
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
import { MLVoteCell } from './model/blocks/vote/vote-cell.model';
import { MLWidget } from './model/blocks/widget.model';
import { MLAudio } from './model/blocks/audio.model';
import { MLMap } from './model/blocks/map.model';
import { MLPost } from './model/blocks/post.model';
import { MLCarousel } from './model/blocks/carousel.model';
import { MLDivider } from './model/blocks/divider.model';
import { MLVote } from './model/blocks/vote/vote.model';
import { MLButton } from './model/blocks/button.model';
import { ModelDefined } from 'sequelize/types';
import { MLTimer } from './model/blocks/timer.model';

@Injectable()
export class MultilinkService {
  constructor(
    @InjectModel(Multilink) private multilinkRepository: typeof Multilink,
    //
    @InjectModel(MLText) private mlTextRepository: typeof MLText,
    @InjectModel(MLSocial) private mlSocialRepository: typeof MLSocial,
    @InjectModel(MLPost) private mlPostRepository: typeof MLPost,
    @InjectModel(MLWidget) private mlWidgetRepository: typeof MLWidget,
    @InjectModel(MLVideo) private mlVideoRepository: typeof MLVideo,
    @InjectModel(MLAudio) private mlAudioRepository: typeof MLAudio,
    @InjectModel(MLMap) private mlMapRepository: typeof MLMap,
    @InjectModel(MLVote) private mlVoteRepository: typeof MLVote,
    @InjectModel(MLFeedback) private mlFeedbackRepository: typeof MLFeedback,
    @InjectModel(MLDivider) private mlDividerRepository: typeof MLDivider,
    //
    @InjectModel(MLLogo) private mlLogoRepository: typeof MLLogo,
    @InjectModel(MLImage) private mlImageRepository: typeof MLImage,
    @InjectModel(MLImageText) private mlImageTextRepository: typeof MLImageText,
    @InjectModel(MLCarousel) private mlCarouselRepository: typeof MLCarousel,
    @InjectModel(MLLink) private mlLinkRepository: typeof MLLink,
    @InjectModel(MLButton) private mlButtonRepository: typeof MLButton,
    @InjectModel(MLShop) private mlShopRepository: typeof MLShop,
    @InjectModel(MLTimer) private mlTimerRepository: typeof MLTimer,
    //
    @InjectModel(MLShopCell) private mlShopCellRepository: typeof MLShopCell,
    @InjectModel(MLVoteCell) private mlVoteCellRepository: typeof MLVoteCell,
    //
    @InjectModel(MLImageData) private mlImageDataRepository: typeof MLImageData,
    @InjectModel(Avatar) private avatarRepository: typeof Avatar,
  ) {}

  async createMultilink(user, dto: CreateMLDto) {
    const { name, background, outerBackground, maxWidth, contentMap, ...blocks } = dto;
    const parsedSets: { [key: string]: any[] } = {};
    getKeys(blocks).forEach(key => {
      parsedSets[key] = JSON.parse(blocks[key]) as any[];
    });

    try {
      /* let multilink = await this.multilinkRepository.findOne({
        where: { userId: user.id, name: dto.name },
      }); */
      await this.multilinkRepository.destroy({
        where: { userId: user.id, name: JSON.parse(name) },
        force: true,
      });
      // <multilink root data>
      const mlRootData = {
        name: JSON.parse(name),
        background: JSON.parse(background),
        outerBackground: JSON.parse(outerBackground),
        maxWidth: +maxWidth,
        contentMap: JSON.parse(contentMap),
      };
      let multilink;
      try {
        multilink = await this.multilinkRepository.create({
          userId: user.id,
          ...mlRootData,
        });
      } catch (error) {
        throw new Error(`Fail in ML creation: ${error}`);
      }
      const multilinkId = multilink.id;
      const logoOrders = [];
      // </multilink root data>
      // <multilink content>
      const createBlockSet = <T extends ModelDefined<any, any>, O extends Record<string, unknown>>(
        blocks: any[],
        repository: T,
        optional?: O,
      ) => {
        try {
          if (blocks.length) {
            blocks.map(async block => {
              await repository.create({ multilinkId, ...block, ...optional });
            });
          }
        } catch (error) {
          throw new Error(`Fail in ${repository.tableName}: ${error}`);
        }
      };
      createBlockSet(parsedSets.textBlocks, this.mlTextRepository);
      createBlockSet(parsedSets.socialBlocks, this.mlSocialRepository);
      createBlockSet(parsedSets.postBlocks, this.mlPostRepository);
      createBlockSet(parsedSets.widgetBlocks, this.mlWidgetRepository);
      createBlockSet(parsedSets.videoBlocks, this.mlVideoRepository);
      createBlockSet(parsedSets.audioBlocks, this.mlAudioRepository);
      createBlockSet(parsedSets.mapBlocks, this.mlMapRepository);
      createBlockSet(parsedSets.feedbackBlocks, this.mlFeedbackRepository);
      createBlockSet(parsedSets.dividerBlocks, this.mlDividerRepository);

      let hasLogo: boolean;
      try {
        if (parsedSets.logoBlocks.length) {
          parsedSets.logoBlocks.map(async block => {
            logoOrders.push(block.order);
            await this.mlLogoRepository.create({ multilinkId, ...block, logo: block.logo ?? '' });
          });
          hasLogo = parsedSets.logoBlocks.some(block => block.logo);
        }
      } catch (error) {
        throw new Error(`Fail in ${this.mlLogoRepository.tableName}: ${error}`);
      }

      createBlockSet(parsedSets.linkBlocks, this.mlLinkRepository, {});
      createBlockSet(parsedSets.buttonBlocks, this.mlButtonRepository, {});
      createBlockSet(parsedSets.imageTextBlocks, this.mlImageTextRepository, {});
      createBlockSet(parsedSets.imageBlocks, this.mlImageRepository, {});
      createBlockSet(parsedSets.carouselBlocks, this.mlCarouselRepository, {});
      createBlockSet(parsedSets.timerBlocks, this.mlTimerRepository, {});

      if (parsedSets.shopBlocks.length) {
        parsedSets.shopBlocks.map(async block => {
          const shopBlock = await this.mlShopRepository.create({ multilinkId, ...block });
          await Promise.all(
            block.cells.map(cell => {
              return this.mlShopCellRepository.create({
                blockId: shopBlock.id,
                ...cell,
              });
            }),
          );
        });
      }
      if (parsedSets.voteBlocks.length) {
        parsedSets.voteBlocks.map(async block => {
          const voteBlock = await this.mlVoteRepository.create({ multilinkId, ...block });
          await Promise.all(
            block.cells.map(cell => {
              return this.mlVoteCellRepository.create({
                blockId: voteBlock.id,
                ...cell,
              });
            }),
          );
        });
      }
      // </multilink content>
      // <multilink images>
      /* images &&
        images.length &&
        (await Promise.all(
          images.map(file => {
            const { order, type, suborder } = {
              order: +file.originalname.split('.')[0].split('_')[0],
              type: file.originalname.split('.')[0].split('_')[1],
              suborder: +file.originalname.split('.')[0].split('_')[2],
            };

            const fileData = {
              imageName: file.originalname.split('.')[0],
              imageType: file.mimetype,
              imageData: file.buffer,
            };

            switch (type) {
              case 'logo':
                // if (suborder === 0) {
                logo = this.mlImageDataRepository.create({
                  multilinkId,
                  type: MLContentType.LOGO,
                  order,
                  suborder,
                  ...fileData,
                });
                return logo;
              // }
              // banner
              if (suborder === 1) {
                  return this.mlImageDataRepository.create({
                    multilinkId,
                    type: MLContentType.LOGO,
                    order,
                    suborder,
                    ...fileData,
                  });
                }
              case 'link':
                return this.mlImageDataRepository.create({
                  multilinkId,
                  type: MLContentType.LINK,
                  order,
                  suborder,
                  ...fileData,
                });
              case 'button':
                return this.mlImageDataRepository.create({
                  multilinkId,
                  type: MLContentType.BUTTON,
                  order,
                  suborder,
                  ...fileData,
                });
              case 'image':
                return this.mlImageDataRepository.create({
                  multilinkId,
                  type: MLContentType.IMAGE,
                  order,
                  suborder,
                  ...fileData,
                });
              case 'imagetext':
                return this.mlImageDataRepository.create({
                  multilinkId,
                  type: MLContentType.IMAGETEXT,
                  order,
                  suborder,
                  ...fileData,
                });
              case 'carousel':
                return this.mlImageDataRepository.create({
                  multilinkId,
                  type: MLContentType.CAROUSEL,
                  order,
                  suborder,
                  ...fileData,
                });
              case 'shop':
                return this.mlImageDataRepository.create({
                  multilinkId,
                  type: MLContentType.SHOP,
                  order,
                  suborder,
                  ...fileData,
                });
            }
            if (file.originalname.split('.')[0] === 'backgroundImage') {
              return this.mlImageDataRepository.create({
                multilinkId,
                type: 'backgroundImage',
                order: 9999,
                suborder: 0,
                ...fileData,
              });
            }
          }),
        ));
      } */
      if (!hasLogo && logoOrders.length) {
        const avatar = await this.avatarRepository.findOne({
          where: { userId: user.id },
        });
        if (avatar) {
          await Promise.all(
            logoOrders.map(order => {
              return this.mlImageDataRepository.create({
                multilinkId: multilink.id,
                type: MLContentType.LOGO,
                order,
                suborder: 0,
                imageName: 'avatar',
                imageType: avatar.imageType,
                imageData: avatar.imageData,
              });
            }),
          );
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
