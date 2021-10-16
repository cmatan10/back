import {Entity, model, property} from '@loopback/repository';

@model()
export class Order extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _orderId?: string;

  @property({
    type: 'string',
    required: true,
  })
  _userId: string;

  @property({
    type: 'string',
    required: true,
  })
  _catId: string;

  @property({
    type: 'number',
    required: true,
  })
  finalPrice: number;

  @property({
    type: 'string',
    required: true,
  })
  deliveryCity: string;

  @property({
    type: 'string',
    required: true,
  })
  deliveryStreet: string;

  @property({
    type: 'date',
    required: true,
  })
  deliveryDate: string;

  @property({
    type: 'date',
    required: true,
  })
  orderDate: string;

  @property({
    type: 'string',
    required: true,
  })
  fourDigit: string;


  constructor(data?: Partial<Order>) {
    super(data);
  }
}

export interface OrderRelations {
  // describe navigational properties here
}

export type OrderWithRelations = Order & OrderRelations;
