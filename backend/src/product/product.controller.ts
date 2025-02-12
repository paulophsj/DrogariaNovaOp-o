import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Product } from 'src/entities/product.entity';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
        constructor(
            private productService: ProductService,
          ) {}

          @Post('/criarproduto')
          async criarProduto(@Body() produto: Product): Promise<Product>{
            return this.productService.criarProduto(produto)
          }

          @Get('/buscartodos')
          async consultarProdutos(): Promise<Product[]>{
            return this.productService.consultarProdutos()
          }
          @Get(':id')
          async findOne(@Param('id') id: number): Promise<Product>{
            return this.productService.findOne(id)
          }

          @Delete(':id')
          async removerProduto(@Param('id') param: number): Promise<any>{
            return this.productService.removerProduto(param)
          }

          @Put(':id')
          async editarProduto(@Param('id') id: number, @Body() novoProduto: Product): Promise<Product>{
            return this.productService.editarProduto(id, novoProduto)
          }
}
