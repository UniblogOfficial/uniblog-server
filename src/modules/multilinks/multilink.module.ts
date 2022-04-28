import { Module } from '@nestjs/common';
import { MultilinkController } from './multilink.controller';
import { MultilinkService } from './multilink.service';

@Module({
  controllers: [MultilinkController],
  providers: [MultilinkService]
})
export class MultilinkModule {}
