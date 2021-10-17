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
  User,
  Cart,
} from '../models';
import {UserRepository} from '../repositories';

export class UserCartController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/cart', {
    responses: {
      '200': {
        description: 'User has one Cart',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cart),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Cart>,
  ): Promise<Cart> {
    return this.userRepository.cart(id).get(filter);
  }

  @post('/users/{id}/cart', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cart)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype._userId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cart, {
            title: 'NewCartInUser',
            exclude: ['_cartId'],
            optional: ['_userId']
          }),
        },
      },
    }) cart: Omit<Cart, '_cartId'>,
  ): Promise<Cart> {
    return this.userRepository.cart(id).create(cart);
  }

  @patch('/users/{id}/cart', {
    responses: {
      '200': {
        description: 'User.Cart PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cart, {partial: true}),
        },
      },
    })
    cart: Partial<Cart>,
    @param.query.object('where', getWhereSchemaFor(Cart)) where?: Where<Cart>,
  ): Promise<Count> {
    return this.userRepository.cart(id).patch(cart, where);
  }

  @del('/users/{id}/cart', {
    responses: {
      '200': {
        description: 'User.Cart DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Cart)) where?: Where<Cart>,
  ): Promise<Count> {
    return this.userRepository.cart(id).delete(where);
  }
}
