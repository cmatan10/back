import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ShopDataSource} from '../datasources';
import {Cart, CartRelations, CartItem, Order} from '../models';
import {CartItemRepository} from './cart-item.repository';
import {OrderRepository} from './order.repository';

export class CartRepository extends DefaultCrudRepository<
  Cart,
  typeof Cart.prototype._cartId,
  CartRelations
> {

  public readonly cartItems: HasManyRepositoryFactory<CartItem, typeof Cart.prototype._cartId>;

  public readonly orders: HasManyRepositoryFactory<Order, typeof Cart.prototype._cartId>;

  constructor(
    @inject('datasources.shop') dataSource: ShopDataSource, @repository.getter('CartItemRepository') protected cartItemRepositoryGetter: Getter<CartItemRepository>, @repository.getter('OrderRepository') protected orderRepositoryGetter: Getter<OrderRepository>,
  ) {
    super(Cart, dataSource);
    this.orders = this.createHasManyRepositoryFactoryFor('orders', orderRepositoryGetter,);
    this.registerInclusionResolver('orders', this.orders.inclusionResolver);
    this.cartItems = this.createHasManyRepositoryFactoryFor('cartItems', cartItemRepositoryGetter,);
    this.registerInclusionResolver('cartItems', this.cartItems.inclusionResolver);
  }
}
