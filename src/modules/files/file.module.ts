import { Module } from '@nestjs/common';

import { FileService } from 'modules/files/file.service';

@Module({
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
