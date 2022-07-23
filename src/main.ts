// import { HttpException, HttpStatus } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from 'app.module';

/* const whitelist = [
  'https://uniblog-online.netlify.app',
  'https://uniblog-server.herokuapp.com',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
]; */

const corsOptions = {
  origin: (origin: any, callback: any) => {
    /* if (!origin || whitelist.indexOf(origin) !== -1) {
      console.log('Allowed cors for: ', origin);
      callback(null, true);
    } else {
      console.log('Blocked cors for: ', origin);
      callback(new HttpException('Not allowed by CORS', HttpStatus.FORBIDDEN));
    } */
    callback(null, true);
  },
  allowedHeaders: 'Content-Type, Accept, Observe, API-KEY, Authorization',
  methods: 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  credentials: true,
};

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  app.enableCors(corsOptions);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Uniblog Server')
    .setDescription('Uniblog REST API Documentation')
    .setVersion('0.1.0')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'API-KEY',
        in: 'header',
        description: 'Enter your API key',
      },
      'API-KEY',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  /* try {
    await MLAudio.create({
      multilinkId: 30,
      order: 0,
      margin: [0, 12],
      type: MLContentType.AUDIO,
      url: 'http//',
    });
  } catch (error) {
    console.log(error.message);
  } */

  // app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
  });
}

start();
