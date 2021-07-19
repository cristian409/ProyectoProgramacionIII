import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Inmueble} from './inmueble.model';
import {Pagos} from './pagos.model';

@model({
  settings: {
    foreignKeys: {
      fkInmuebleId: {
        name: 'fkInmuebleId',
        entity: 'Inmueble',
        entityKey: 'codigo',
        foreignKey: 'inmuebleId',
      },
      fkClienteId: {
        name: 'fkClienteId',
        entity: 'Cliente',
        entityKey: 'id',
        foreignKey: 'clienteId',
      }
    },
  },
})
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

  @belongsTo(() => Inmueble)
  inmuebleId: number;

  @hasMany(() => Pagos)
  pagos: Pagos[];

  @belongsTo(() => Cliente)
  clienteId: number;

  constructor(data?: Partial<SolicitudInmueble>) {
    super(data);
  }
}

export interface SolicitudInmuebleRelations {
  // describe navigational properties here
}

export type SolicitudInmuebleWithRelations = SolicitudInmueble & SolicitudInmuebleRelations;
