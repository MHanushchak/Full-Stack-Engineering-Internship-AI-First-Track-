import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

export enum ProductStatus {
  OUT_OF_STOCK = 'out_of_stock',
  LOW_STOCK = 'low_stock',
  IN_STOCK = 'in_stock',
}

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'int' })
  quantity!: number;

  @Column({ type: 'float' })
  price!: number;

  @Column({ type: 'enum', enum: ProductStatus })
  status!: ProductStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  // Automatically calculate status before saving to the database
  @BeforeInsert()
  @BeforeUpdate()
  calculateStatus() {
    if (this.quantity === 0) {
      this.status = ProductStatus.OUT_OF_STOCK;
    } else if (this.quantity >= 1 && this.quantity <= 5) {
      this.status = ProductStatus.LOW_STOCK;
    } else if (this.quantity > 5) {
      this.status = ProductStatus.IN_STOCK;
    }
  }
}
