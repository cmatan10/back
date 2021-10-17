import {Entity, model, property, hasMany} from '@loopback/repository';
import {Product} from './product.model';

@model()
export class Category extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _catId?: string;

  @property({
    type: 'string',
    required: true,
  })
  catName: string;

  @hasMany(() => Product, {keyTo: '_catId'})
  products: Product[];

  constructor(data?: Partial<Category>) {
    super(data);
  }
}

export interface CategoryRelations {
  // describe navigational properties here
}

export type CategoryWithRelations = Category & CategoryRelations;
