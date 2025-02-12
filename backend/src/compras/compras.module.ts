import { Module } from '@nestjs/common';
import { ComprasService } from './compras.service';
import { ComprasController } from './compras.controller';
import { Compras } from 'src/entities/compras.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Compras])],
  providers: [ComprasService],
  controllers: [ComprasController],
})
export class ComprasModule {}
