import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1')

  const config = app.get(ConfigService);
  const documentConfig = new DocumentBuilder()
    .setTitle('Social Feed')
    .setDescription('The social feed API description')
    .setVersion('1.0')
    .addServer(config.get('APP.SERVER'))
    .addTag('social-feed')
    .build();
  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('documentation', app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(config.get('APP.PORT'), config.get('APP.HOST'));
}
bootstrap();
