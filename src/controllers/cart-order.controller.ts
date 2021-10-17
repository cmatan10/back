import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Cart,
  Order,
} from '../models';
import {CartRepository} from '../repositories';

export class CartOrderController {
  constructor(
    @repository(CartRepository) protected cartRepository: CartRepository,
  ) { }

  @get('/carts/{id}/orders', {
    responses: {
      '200': {
        description: 'Array of Cart has many Order',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Order)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Order>,
  ): Promise<Order[]> {
    return this.cartRepository.orders(id).find(filter);
  }

  @post('/carts/{id}/orders', {
    responses: {
      '200': {
        description: 'Cart model instance',
        content: {'application/json': {schema: getModelSchemaRef(Order)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Cart.prototype._cartId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {
            title: 'NewOrderInCart',
            exclude: ['_orderId'],
            optional: ['_cartId']
          }),
        },
      },
    }) order: Omit<Order, '_orderId'>,
  ): Promise<Order> {
    return this.cartRepository.orders(id).create(order);
  }

  @patch('/carts/{id}/orders', {
    responses: {
      '200': {
        description: 'Cart.Order PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {partial: true}),
        },
      },
    })
    order: Partial<Order>,
    @param.query.object('where', getWhereSchemaFor(Order)) where?: Where<Order>,
  ): Promise<Count> {
    return this.cartRepository.orders(id).patch(order, where);
  }

  @del('/carts/{id}/orders', {
    responses: {
      '200': {
        description: 'Cart.Order DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Order)) where?: Where<Order>,
  ): Promise<Count> {
    return this.cartRepository.orders(id).delete(where);
  }
}
