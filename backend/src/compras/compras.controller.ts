import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ComprasService } from './compras.service';
import { Compras } from 'src/entities/compras.entity';

@Controller('compras')
export class ComprasController {
  constructor(private comprasService: ComprasService) {}

  @Post('/salvarcompras')
  async criarRegistro(@Body() compra: Compras): Promise<Compras>{
    return await this.comprasService.criarRegistro(compra)
  }

  @Get('/buscarcompras')
  async buscarTodos(): Promise<Compras[]>{
    return await this.comprasService.buscarTodos()
  }

  @Delete(':id')
  async deletar(@Param('id') id: number): Promise<any>{
    return this.comprasService.deletar(id)
  }

}
