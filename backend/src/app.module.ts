import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductModule } from './product/product.module';
import { ComprasModule } from './compras/compras.module';
import { Compras } from './entities/compras.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USERNAME ? process.env.DB_USERNAME : 'root',
      password: process.env.DB_PASSWORD ? process.env.DB_PASSWORD : 'root',
      database: 'drogaria',
      entities: [Product, Compras],
      synchronize: true,
      autoLoadEntities: true
    }),
    ProductModule,
    ComprasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
