import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Order} from './order.model';
import {Cart} from './cart.model';

@model()
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _userId?: string;

  @property({
    type: 'string',
    required: true,
  })
  fName: string;

  @property({
    type: 'string',
    required: true,
  })
  lName: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    default: "",
  })
  tel?: string;

  @property({
    type: 'string',
    default: "",
  })
  addressStreet?: string;

  @property({
    type: 'string',
    default: "",
  })
  addressCity?: string;

  @property({
    type: 'boolean',
    default: false,
  })
  role?: boolean;

  @hasMany(() => Order, {keyTo: '_userId'})
  orders: Order[];

  @hasOne(() => Cart, {keyTo: '_userId'})
  cart: Cart;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
