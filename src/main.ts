import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from "@nestjs/platform-express";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );
  const config = app.get(ConfigService);

  app.setGlobalPrefix('api/v1')
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useStaticAssets(join(__dirname, '..', 'uploads-tmp'), {
    prefix: config.get('APP.IMAGE_SERVER_PATH'),
  });

  const documentConfig = new DocumentBuilder()
    .setTitle('Social Feed')
    .setDescription('The social feed API description')
    .setVersion('1.0')
    .addServer(config.get('APP.SERVER'))
    .addTag('social-feed')
    .build();
  const document = SwaggerModule.createDocument(app, documentConfig);

  SwaggerModule.setup('documentation', app, document);

  await app.listen(config.get('APP.PORT'), config.get('APP.HOST'));
}
bootstrap();
