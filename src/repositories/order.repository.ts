import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ShopDataSource} from '../datasources';
import {Order, OrderRelations} from '../models';

export class OrderRepository extends DefaultCrudRepository<
  Order,
  typeof Order.prototype._orderId,
  OrderRelations
> {
  constructor(
    @inject('datasources.shop') dataSource: ShopDataSource,
  ) {
    super(Order, dataSource);
  }
}
