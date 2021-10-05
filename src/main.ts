import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import CookieSession from 'cookie-session';
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const cookieSession = require('cookie-session');
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));

  // app.use(cookieSession({ keys: ['putAnyStringSecretKey'] }));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(5050, () => {
    console.log(process.env.NODE_ENV);
  });
}
bootstrap();
