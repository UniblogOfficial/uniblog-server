import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { PrismaModule } from 'modules/prisma/prisma.module';
import { UserModule } from 'modules/users/user.module';
import { AuthModule } from 'modules/auth/auth.module';

import { MultilinkService } from 'modules/multilinks/multilink.service';

import { MultilinkController } from 'modules/multilinks/multilink.controller';

@Module({
  controllers: [MultilinkController],
  providers: [MultilinkService],
  imports: [
    PrismaModule,
    MulterModule.register({
      // dest: 'dist/images',
    }),
    AuthModule,
    UserModule,
  ],
})
export class MultilinkModule {}
