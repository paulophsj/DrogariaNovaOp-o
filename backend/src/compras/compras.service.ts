import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Compras } from 'src/entities/compras.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ComprasService {
  constructor(
    @InjectRepository(Compras)
    private comprasRepository: Repository<Compras>,
  ) {}

  async criarRegistro(compra: Compras): Promise<Compras> {
    const criar = await this.comprasRepository.create({
      quantidadeProdutos: compra.quantidadeProdutos,
      nomeProduto: compra.nomeProduto,
      precoUnitario: compra.precoUnitario,
      totalCompra: compra.totalCompra,
      tipoPagamento: compra.tipoPagamento
    });
    return await this.comprasRepository.save(criar);
  }
  async buscarTodos(): Promise<Compras[]> {
    return await this.comprasRepository.find();
  }

  async deletar(id: number): Promise<any> {
    const find = await this.comprasRepository.findOneOrFail({ where: { id } });
    if (!find) {
      throw new NotFoundException('Produto não encontrado');
    }
    return await this.comprasRepository.remove(find);
  }
}
