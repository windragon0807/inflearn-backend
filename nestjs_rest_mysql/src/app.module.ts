import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { BoardsModule } from './apis/boards/boards.module';
import { Board } from './apis/boards/entities/boards.entity';

@Module({
  imports: [
    BoardsModule, //

    /**
     * .env 사용을 위해 Nest에서 제공하는 ConfigModule을 사용해줍니다.
     * .env 파일은 모두 string으로 인식됩니다.
     */
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [Board],
      synchronize: true,
      logging: true,
    }),
  ],
})
export class AppModule {}
