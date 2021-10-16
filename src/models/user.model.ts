import {Entity, model, property} from '@loopback/repository';

@model()
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _userId?: string;

  @property({
    type: 'string',
    required: true,
  })
  fName: string;

  @property({
    type: 'string',
    required: true,
  })
  lName: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    default: "",
  })
  tel?: string;

  @property({
    type: 'string',
    default: "",
  })
  addressStreet?: string;

  @property({
    type: 'string',
    default: "",
  })
  addressCity?: string;

  @property({
    type: 'boolean',
    default: false,
  })
  role?: boolean;


  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
