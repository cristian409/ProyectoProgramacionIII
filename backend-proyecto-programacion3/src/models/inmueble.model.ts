import {belongsTo, Entity, model, property, hasMany} from '@loopback/repository';
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
    type: 'number',
    required: true,
  })
  identificador: number;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

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
