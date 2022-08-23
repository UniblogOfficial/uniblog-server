import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from 'modules/prisma/prisma.service';

import { getKeys } from 'common/utils';

import { CreateMLDto } from 'modules/multilinks/dto/create-ml.dto';

@Injectable()
export class MultilinkService {
  constructor(private prisma: PrismaService) {}

  private include: {
    MLAudios: true;
    MLButtons: true;
    MLCarousels: true;
    MLDividers: true;
    MLFeedbacks: true;
    MLImageDatas: true;
    MLImages: true;
    MLImageTexts: true;
    MLLinks: true;
    MLLogos: true;
    MLMaps: true;
    MLPosts: true;
    MLShops: { include: { MLShopCells: true } };
    MLSocials: true;
    MLTexts: true;
    MLTimers: true;
    MLVideos: true;
    MLVotes: { include: { MLVoteCells: true } };
    MLWidgets: true;
  };

  async createMultilink(userId: string, dto: CreateMLDto) {
    const { name, background, outerBackground, maxWidth, contentMap, ...blocks } = dto;
    const parsedSets: { [key: string]: any[] } = {};

    getKeys(blocks).forEach(key => {
      parsedSets[key] = JSON.parse(blocks[key]) as any[];
    });

    try {
      await this.prisma.multilink.deleteMany({ where: { userId, name: JSON.parse(name) } });

      // <multilink root data>

      const mlRootData = {
        maxWidth: +maxWidth,
        name: JSON.parse(name),
        background: JSON.parse(background),
        outerBackground: JSON.parse(outerBackground),
        contentMap: JSON.parse(contentMap),
      };

      let multilink: any;
      try {
        multilink = await this.prisma.multilink.create({
          data: {
            ...mlRootData,
            userId,
          },
        });
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }

      const multilinkId = multilink.id;
      const logoOrders = [];

      // </multilink root data>
      // <multilink content>

      const createBlockSet = (blocks: any[], modelName: string) => {
        return blocks.map(block =>
          this.prisma[modelName].create({ data: { ...block, multilinkId } }),
        );
      };

      try {
        await this.prisma.$transaction(
          [
            createBlockSet(parsedSets.textBlocks, 'mLText'),
            createBlockSet(parsedSets.socialBlocks, 'mLSocial'),
            createBlockSet(parsedSets.postBlocks, 'mLPost'),
            createBlockSet(parsedSets.widgetBlocks, 'mLWidget'),
            createBlockSet(parsedSets.videoBlocks, 'mLVideo'),
            createBlockSet(parsedSets.audioBlocks, 'mLAudio'),
            createBlockSet(parsedSets.mapBlocks, 'mLMap'),
            createBlockSet(parsedSets.feedbackBlocks, 'mLFeedback'),
            createBlockSet(parsedSets.dividerBlocks, 'mLDivider'),
            createBlockSet(parsedSets.linkBlocks, 'mLLink'),
            createBlockSet(parsedSets.buttonBlocks, 'mLButton'),
            createBlockSet(parsedSets.imageTextBlocks, 'mLImageText'),
            createBlockSet(parsedSets.imageBlocks, 'mLImage'),
            createBlockSet(parsedSets.carouselBlocks, 'mLCarousel'),
            createBlockSet(parsedSets.timerBlocks, 'mLTimer'),
          ].flat(),
        );
      } catch (error) {
        throw new HttpException(
          `Base blocks creation error - ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      let hasLogo = false;
      try {
        await this.prisma.$transaction(
          parsedSets.logoBlocks.map(block => {
            if (block.logo) hasLogo = true;
            logoOrders.push(block.order);

            return this.prisma.mLLogo.create({
              data: { ...block, multilinkId, logo: block.logo || '' },
            });
          }),
        );
      } catch (error) {
        throw new HttpException(
          `mLLogo creation error - ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      await Promise.all(
        parsedSets.shopBlocks.flatMap(async block => {
          const shopBlock = await this.prisma.mLShop.create({ data: { ...block, multilinkId } });

          return block.cells.map((cell: any) => {
            return this.prisma.mLShopCell.create({ data: { ...cell, blockId: shopBlock.id } });
          });
        }),
      );

      await Promise.all(
        parsedSets.voteBlocks.flatMap(async block => {
          const voteBlock = await this.prisma.mLVote.create({ data: { ...block, multilinkId } });

          return block.cells.map((cell: any) => {
            return this.prisma.mLVoteCell.create({ data: { ...cell, blockId: voteBlock.id } });
          });
        }),
      );

      if (!hasLogo && logoOrders.length) {
        const avatar = await this.prisma.avatar.findUnique({ where: { userId } });

        if (avatar) {
          await this.prisma.$transaction(
            logoOrders.map(order => {
              return this.prisma.mLImageData.create({
                data: {
                  order,
                  suborder: 0,
                  type: 'logo',
                  imageName: 'avatar',
                  multilinkId: multilink.id,
                  imageType: avatar.imageType,
                  imageData: avatar.imageData,
                },
              });
            }),
          );
        }
      }

      // </multilink content>

      const createdML = await this.prisma.multilink.findUnique({
        where: { id: multilink.id },
        include: this.include,
      });

      return createdML;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getMLByName(name: string) {
    try {
      return this.prisma.multilink.update({
        where: { name },
        data: { clickCount: { increment: 1 } },
        include: this.include,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async getMLsByUserId(user: any) {
    return this.prisma.multilink.findMany({
      where: { userId: user.id },
      include: this.include,
    });
  }
}
