import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async criarProduto(produto: Product): Promise<Product> {
    const create = await this.productRepository.create({
      nome: produto.nome,
      imagem: produto.imagem,
      preco: produto.preco,
      descricao: produto.descricao,
    });
    return this.productRepository.save(create);
  }

  async consultarProdutos(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async removerProduto(id: number): Promise<any> {
    const produto = await this.productRepository.findOne({ where: { id } });
    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }
    const response = await this.productRepository.remove(produto);
    return { message: 'Produto removido com sucesso!', produto: response };
  }

  async editarProduto(id: number, novoProduto: Product): Promise<Product>{
        let product;
        try {
          product = await this.productRepository.findOneOrFail({ where: { id } });
        } catch (error) {
          throw new NotFoundException('Produto não encontrado');
        }
    
        Object.assign(product, novoProduto);
    
        return this.productRepository.save(product);
  }
  async findOne(id: number): Promise<Product> {
    try {
      return await this.productRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Produto não encontrado`);
    }
  }
}
