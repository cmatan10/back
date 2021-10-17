import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ShopDataSource} from '../datasources';
import {Category, CategoryRelations, Product} from '../models';
import {ProductRepository} from './product.repository';

export class CategoryRepository extends DefaultCrudRepository<
  Category,
  typeof Category.prototype._catId,
  CategoryRelations
> {

  public readonly products: HasManyRepositoryFactory<Product, typeof Category.prototype._catId>;

  constructor(
    @inject('datasources.shop') dataSource: ShopDataSource, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(Category, dataSource);
    this.products = this.createHasManyRepositoryFactoryFor('products', productRepositoryGetter,);
    this.registerInclusionResolver('products', this.products.inclusionResolver);
  }
}
