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
  Product,
  CartItem,
} from '../models';
import {ProductRepository} from '../repositories';

export class ProductCartItemController {
  constructor(
    @repository(ProductRepository) protected productRepository: ProductRepository,
  ) { }

  @get('/products/{id}/cart-items', {
    responses: {
      '200': {
        description: 'Array of Product has many CartItem',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CartItem)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<CartItem>,
  ): Promise<CartItem[]> {
    return this.productRepository.cartItems(id).find(filter);
  }

  @post('/products/{id}/cart-items', {
    responses: {
      '200': {
        description: 'Product model instance',
        content: {'application/json': {schema: getModelSchemaRef(CartItem)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Product.prototype._productId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CartItem, {
            title: 'NewCartItemInProduct',
            exclude: ['_itemId'],
            optional: ['_productId']
          }),
        },
      },
    }) cartItem: Omit<CartItem, '_itemId'>,
  ): Promise<CartItem> {
    return this.productRepository.cartItems(id).create(cartItem);
  }

  @patch('/products/{id}/cart-items', {
    responses: {
      '200': {
        description: 'Product.CartItem PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CartItem, {partial: true}),
        },
      },
    })
    cartItem: Partial<CartItem>,
    @param.query.object('where', getWhereSchemaFor(CartItem)) where?: Where<CartItem>,
  ): Promise<Count> {
    return this.productRepository.cartItems(id).patch(cartItem, where);
  }

  @del('/products/{id}/cart-items', {
    responses: {
      '200': {
        description: 'Product.CartItem DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(CartItem)) where?: Where<CartItem>,
  ): Promise<Count> {
    return this.productRepository.cartItems(id).delete(where);
  }
}
