import {Entity, model, property, hasMany} from '@loopback/repository';
import {CartItem} from './cart-item.model';
import {Order} from './order.model';

@model()
export class Cart extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _cartId?: string;

  @property({
    type: 'string',
    required: true,
  })
  _userId: string;

  @property({
    type: 'date',
    required: true,
  })
  creationDate: string;

  @hasMany(() => CartItem, {keyTo: '_cartId'})
  cartItems: CartItem[];

  @hasMany(() => Order, {keyTo: '_cartId'})
  orders: Order[];

  constructor(data?: Partial<Cart>) {
    super(data);
  }
}

export interface CartRelations {
  // describe navigational properties here
}

export type CartWithRelations = Cart & CartRelations;
