import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from 'modules/users/user.module';

import { AuthService } from 'modules/auth/auth.service';
import { AuthController } from 'modules/auth/auth.controller';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }),
    ConfigModule,
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
