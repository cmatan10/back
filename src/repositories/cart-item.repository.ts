import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ShopDataSource} from '../datasources';
import {CartItem, CartItemRelations} from '../models';

export class CartItemRepository extends DefaultCrudRepository<
  CartItem,
  typeof CartItem.prototype._itemId,
  CartItemRelations
> {
  constructor(
    @inject('datasources.shop') dataSource: ShopDataSource,
  ) {
    super(CartItem, dataSource);
  }
}
