import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // instrument: ObserveInstrument,
  });
  // Kích hoạt tính năng đọc các decorator validate trong DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Tự động loại bỏ các field thừa không có trong DTO
      forbidNonWhitelisted: true, // Báo lỗi 400 nếu client gửi lên field lạ
      transform: true, // Tự động convert kiểu dữ liệu tương ứng (string sang number, boolean...)
    }),
  );
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
await bootstrap();
