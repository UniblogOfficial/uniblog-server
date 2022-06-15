import { ForbiddenException, Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const apiKey = req.headers['api-key'];
      const configApiKey = this.configService.get('apiKey');

      if (!apiKey) throw new Error('API key is not provided');
      if (configApiKey !== apiKey) throw new Error('API key is invalid');

      return true;
    } catch (error) {
      throw new ForbiddenException({ message: error.message });
    }
  }
}
