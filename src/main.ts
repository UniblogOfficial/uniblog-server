import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const whitelist = [
  'https://uniblog-online.netlify.app',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      console.log('Allowed cors for: ', origin);
      callback(null, true);
    } else {
      console.log('Blocked cors for: ', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  // allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
  methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
  credentials: true,
};

async function start() {
  const PORT = process.env.PORT || 5000;
  console.log(process.env.NODE_ENV);
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptions);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Uniblog Server')
    .setDescription('Uniblog REST API Documentation')
    .setVersion('0.1.0')
    .addTag('krank')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  // app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
  });
}

start();
