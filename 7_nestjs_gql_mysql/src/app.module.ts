import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { BoardModule } from './apis/boards/board.module';
import { ProductModule } from './apis/products/product.module';
import { ProductCategoryModule } from './apis/productsCategories/productCategory.module';
import { UserModule } from './apis/users/user.module';
import { AuthModule } from './apis/auth/auth.module';
import { PointsTransactionModule } from './apis/pointsTransactions/pointsTransaction.module';
import { FileModule } from './apis/files/file.module';

@Module({
  imports: [
    AuthModule,
    BoardModule,
    FileModule,
    PointsTransactionModule,
    ProductModule,
    ProductCategoryModule,
    UserModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/graphql/schema.gql',
      // req는 기본적으로 들어오지만, res는 이걸 작성해야만 들어옴
      context: ({ req, res }) => ({ req, res }),
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql', // 데이터 베이스 타입
      host: process.env.DATABASE_HOST, // local 환경으로 진행
      port: Number(process.env.DATABASE_PORT), // mysql은 기본 port는 3306
      username: process.env.DATABASE_USERNAME, // mysql은 기본 user는 root로 지정
      password: process.env.DATABASE_PASSWORD, // 본인의 mysql password
      database: process.env.DATABASE_DATABASE, // 연결할 데이터 베이스명
      entities: [__dirname + '/apis/**/*.entity.*'], // 데이터 베이스와 연결할 entity
      synchronize: true, // entity 테이블을 데이터베이스와 동기화할 것인지
      logging: true, // 콘솔 창에 log를 표시할 것인지
    }),
  ],
})
export class AppModule {}
