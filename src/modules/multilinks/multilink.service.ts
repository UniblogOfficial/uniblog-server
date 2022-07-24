import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Includeable, ModelDefined } from 'sequelize/types';

import { getKeys } from 'common/utils';

import { MLFeedback } from 'modules/multilinks/model/blocks/feedback.model';
import { MLImageData } from 'modules/multilinks/model/images/ml-imagedata.model';
import { MLShopCell } from 'modules/multilinks/model/blocks/shop/shop-cell.model';
import { MLShop } from 'modules/multilinks/model/blocks/shop/shop.model';
import { MLVideo } from 'modules/multilinks/model/blocks/video.model';
import { MLLink } from 'modules/multilinks/model/blocks/link.model';
import { MLImageText } from 'modules/multilinks/model/blocks/imagetext.model';
import { MLImage } from 'modules/multilinks/model/blocks/image.model';
import { MLSocial } from 'modules/multilinks/model/blocks/social.model';
import { MLText } from 'modules/multilinks/model/blocks/text.model';
import { MLContentType, Multilink } from 'modules/multilinks/model/multilink.model';
import { CreateMLDto } from 'modules/multilinks/dto/create-ml.dto';
import { MLLogo } from 'modules/multilinks/model/blocks/logo.model';
import { Avatar } from 'modules/users/model/avatar.model';
import { MLVoteCell } from 'modules/multilinks/model/blocks/vote/vote-cell.model';
import { MLWidget } from 'modules/multilinks/model/blocks/widget.model';
import { MLAudio } from 'modules/multilinks/model/blocks/audio.model';
import { MLMap } from 'modules/multilinks/model/blocks/map.model';
import { MLPost } from 'modules/multilinks/model/blocks/post.model';
import { MLCarousel } from 'modules/multilinks/model/blocks/carousel.model';
import { MLDivider } from 'modules/multilinks/model/blocks/divider.model';
import { MLVote } from 'modules/multilinks/model/blocks/vote/vote.model';
import { MLButton } from 'modules/multilinks/model/blocks/button.model';
import { MLTimer } from 'modules/multilinks/model/blocks/timer.model';

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

  includeOptions: Includeable[] = [
    { model: MLText, separate: true },
    { model: MLSocial, separate: true },
    { model: MLPost, separate: true },
    { model: MLWidget, separate: true },
    { model: MLVideo, separate: true },
    { model: MLAudio, separate: true },
    { model: MLMap, separate: true },
    { model: MLVote, separate: true, include: [{ model: MLVoteCell, separate: true }] },
    { model: MLFeedback, separate: true },
    { model: MLDivider, separate: true },

    { model: MLLogo, separate: true },
    { model: MLImage, separate: true },
    { model: MLImageText, separate: true },
    { model: MLCarousel, separate: true },
    { model: MLLink, separate: true },
    { model: MLButton, separate: true },
    { model: MLShop, separate: true, include: [{ model: MLShopCell, separate: true }] },
    { model: MLTimer, separate: true },
    { model: MLImageData, separate: true },
  ];

  async createMultilink(user: any, dto: CreateMLDto) {
    const { id: userId } = user;
    const { name, background, outerBackground, maxWidth, contentMap, ...blocks } = dto;
    const parsedSets: { [key: string]: any[] } = {};

    getKeys(blocks).forEach(key => {
      parsedSets[key] = JSON.parse(blocks[key]) as any[];
    });

    try {
      await this.multilinkRepository.destroy({
        where: { userId, name: JSON.parse(name) },
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

      let multilink: any;

      try {
        multilink = await this.multilinkRepository.create({
          userId,
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
              await repository.create({ ...block, ...optional, multilinkId });
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
            await this.mlLogoRepository.create({ ...block, multilinkId, logo: block.logo || '' });
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
          const shopBlock = await this.mlShopRepository.create({ ...block, multilinkId });

          await Promise.all(
            block.cells.map((cell: any) => {
              return this.mlShopCellRepository.create({ ...cell, blockId: shopBlock.id });
            }),
          );
        });
      }

      if (parsedSets.voteBlocks.length) {
        parsedSets.voteBlocks.map(async block => {
          const voteBlock = await this.mlVoteRepository.create({ ...block, multilinkId });
          await Promise.all(
            block.cells.map((cell: any) => {
              return this.mlVoteCellRepository.create({ ...cell, blockId: voteBlock.id });
            }),
          );
        });
      }

      // </multilink content>
      // <multilink images>

      if (!hasLogo && logoOrders.length) {
        const avatar = await this.avatarRepository.findOne({ where: { userId } });

        if (avatar) {
          await Promise.all(
            logoOrders.map(order => {
              return this.mlImageDataRepository.create({
                order,
                suborder: 0,
                imageName: 'avatar',
                type: MLContentType.LOGO,
                multilinkId: multilink.id,
                imageType: avatar.imageType,
                imageData: avatar.imageData,
              });
            }),
          );
        }
      }

      // </multilink images>

      const createdML = await this.multilinkRepository.findByPk(multilink.id, {
        include: this.includeOptions,
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
        include: this.includeOptions,
      });

      multilink.clickCount++;
      multilink.save();

      return { data: { multilink }, message: 'Here we go' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async getMLsByUserId(user: any) {
    try {
      const multilinks = await this.multilinkRepository.findAll({
        where: { userId: user.id },
        include: this.includeOptions,
      });

      return { data: { multilinks }, message: 'Here all your stuff, sir' };
    } catch (error) {
      throw new HttpException(`DB Error: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
