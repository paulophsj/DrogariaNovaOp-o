import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Compras {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantidadeProdutos: number

  @Column()
  nomeProduto: string

  @Column('decimal', { scale: 2, precision: 6 })
  precoUnitario: number;

  @Column('decimal', { scale: 2, precision: 6 })
  totalCompra: number;

  @Column()
  tipoPagamento: string;
}
