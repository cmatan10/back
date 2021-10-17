import {Entity, model, property, hasMany} from '@loopback/repository';
import {CartItem} from './cart-item.model';

@model()
export class Product extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _productId?: string;

  @property({
    type: 'string',
    required: true,
  })
  _catId: string;

  @property({
    type: 'string',
    required: true,
  })
  prodName: string;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'number',
    required: true,
  })
  amount: number;

  @property({
    type: 'string',
    required: true,
  })
  image: string;

  @property({
    type: 'string',
    default: "",
  })
  description?: string;

  @hasMany(() => CartItem, {keyTo: '_productId'})
  cartItems: CartItem[];

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

export type ProductWithRelations = Product & ProductRelations;
