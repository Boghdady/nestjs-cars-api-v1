import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session');
import { join } from 'path';

@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   renderPath: join(__dirname, '..', 'public'),
    // }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: 'cars.db.sqlite',
    //   entities: [User, Report],
    //   synchronize: true, // Auto migration.. don't do that in production
    // }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'sqlite',
          database: config.get<string>('DB_NAME'),
          entities: [User, Report],
          synchronize: true, // Auto migration.. don't do that in production
        };
      },
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  // configure => function that run automatically
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieSession({ keys: ['jdhskjhfdjh'] })).forRoutes('*');
  }
}
