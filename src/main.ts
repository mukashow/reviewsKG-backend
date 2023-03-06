import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from './pipes/validation';

const start = async () => {
  const PORT = process.env.PORT || 5001;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Отзыв KG')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => {
    console.log('start on ' + PORT);
  });
};

start();
