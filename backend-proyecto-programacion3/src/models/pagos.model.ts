import {Entity, model, property} from '@loopback/repository';

@model()
export class Pagos extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  comprobante: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;


  constructor(data?: Partial<Pagos>) {
    super(data);
  }
}

export interface PagosRelations {
  // describe navigational properties here
}

export type PagosWithRelations = Pagos & PagosRelations;
