import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Cart>) {
    super(data);
  }
}

export interface CartRelations {
  // describe navigational properties here
}

export type CartWithRelations = Cart & CartRelations;
