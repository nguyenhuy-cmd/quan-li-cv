import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // instrument: ObserveInstrument,
  });
  app.enableCors({ origin: true, credentials: true });
  // Kích hoạt tính năng đọc các decorator validate trong DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Tự động loại bỏ các field thừa không có trong DTO
      forbidNonWhitelisted: true, // Báo lỗi 400 nếu client gửi lên field lạ
      transform: true, // Tự động convert kiểu dữ liệu tương ứng (string sang number, boolean...)
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('quan-li-cv API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  await app.listen(port, '0.0.0.0');
}
await bootstrap();
