import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  imagem: string;

  @Column('decimal', { scale: 2, precision: 6 })
  preco: number;

  @Column()
  descricao: string;
}
