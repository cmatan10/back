import {Entity, model, property} from '@loopback/repository';

@model()
export class CartItem extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _itemId?: string;

  @property({
    type: 'string',
    required: true,
  })
  _productId: string;

  @property({
    type: 'string',
    required: true,
  })
  _cartId: string;

  @property({
    type: 'number',
    required: true,
  })
  totalPrice: number;

  @property({
    type: 'number',
    required: true,
  })
  amount: number;


  constructor(data?: Partial<CartItem>) {
    super(data);
  }
}

export interface CartItemRelations {
  // describe navigational properties here
}

export type CartItemWithRelations = CartItem & CartItemRelations;
