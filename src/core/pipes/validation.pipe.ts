import { ValidationException } from './../exceptions/validation.exception';
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToInstance(metadata.metatype, value);
    console.log(value);

    const errors = await validate(obj);
    if (errors.length) {
      const messages = errors.map(
        error => `${error.property} - ${Object.values(error.constraints).join(', ')}`,
      );
      throw new ValidationException(messages);
    }
    return value;
  }
}
