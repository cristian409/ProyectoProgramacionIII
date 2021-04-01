import {Entity, model, property} from '@loopback/repository';

@model()
export class SolicitudInmueble extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  fecha: string;

  @property({
    type: 'number',
    required: true,
  })
  ofertaEconomica: number;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;


  constructor(data?: Partial<SolicitudInmueble>) {
    super(data);
  }
}

export interface SolicitudInmuebleRelations {
  // describe navigational properties here
}

export type SolicitudInmuebleWithRelations = SolicitudInmueble & SolicitudInmuebleRelations;
