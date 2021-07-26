import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Bloque} from './bloque.model';
import {SolicitudInmueble} from './solicitud-inmueble.model';

@model({
  settings: {
    foreignKeys: {
      fkBloqueId: {
        name: 'fkBloqueId',
        entity: 'Bloque',
        entityKey: 'codigo',
        foreignKey: 'bloqueId',
      },
    },
  },
})
export class Inmueble extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  codigo?: number;

  @property({
    type: 'string',
    required: true,
  })
  identificador: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @property({
    type: 'string',
    required: true,
  })
  solicitud: string;

  @belongsTo(() => Bloque)
  bloqueId: number;

  @hasMany(() => SolicitudInmueble)
  solicitudInmuebles: SolicitudInmueble[];

  constructor(data?: Partial<Inmueble>) {
    super(data);
  }
}

export interface InmuebleRelations {
  // describe navigational properties here
}

export type InmuebleWithRelations = Inmueble & InmuebleRelations;
