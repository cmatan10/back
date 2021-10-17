import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ShopDataSource} from '../datasources';
import {Product, ProductRelations, CartItem} from '../models';
import {CartItemRepository} from './cart-item.repository';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype._productId,
  ProductRelations
> {

  public readonly cartItems: HasManyRepositoryFactory<CartItem, typeof Product.prototype._productId>;

  constructor(
    @inject('datasources.shop') dataSource: ShopDataSource, @repository.getter('CartItemRepository') protected cartItemRepositoryGetter: Getter<CartItemRepository>,
  ) {
    super(Product, dataSource);
    this.cartItems = this.createHasManyRepositoryFactoryFor('cartItems', cartItemRepositoryGetter,);
    this.registerInclusionResolver('cartItems', this.cartItems.inclusionResolver);
  }
}
