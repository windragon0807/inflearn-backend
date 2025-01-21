import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from '@products/product.module';
import { ProductCategoryModule } from '@productCategories/productCategory.module';
import { UserModule } from './apis/users/user.module';
import { AuthModule } from './apis/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ProductModule,
    ProductCategoryModule,

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
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
  ],
})
export class AppModule {}
