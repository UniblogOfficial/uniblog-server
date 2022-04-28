import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsEmail } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'vasyaraper@gmail.com', description: 'User email' })
  @IsString({ message: 'Must be a string' })
  @IsEmail({}, { message: 'Email is invalid' })
  readonly email: string;

  @ApiProperty({ example: 'qwerty123', description: 'User password' })
  @IsString({ message: 'Must be a string' })
  @Length(8, 64, { message: 'Must be more than 7 and less than 65 chars' })
  readonly password: string;
}
