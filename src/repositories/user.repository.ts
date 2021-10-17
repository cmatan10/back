import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ShopDataSource} from '../datasources';
import {User, UserRelations, Order} from '../models';
import {OrderRepository} from './order.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype._userId,
  UserRelations
> {

  public readonly orders: HasManyRepositoryFactory<Order, typeof User.prototype._userId>;

  constructor(
    @inject('datasources.shop') dataSource: ShopDataSource, @repository.getter('OrderRepository') protected orderRepositoryGetter: Getter<OrderRepository>,
  ) {
    super(User, dataSource);
    this.orders = this.createHasManyRepositoryFactoryFor('orders', orderRepositoryGetter,);
    this.registerInclusionResolver('orders', this.orders.inclusionResolver);
  }
}
