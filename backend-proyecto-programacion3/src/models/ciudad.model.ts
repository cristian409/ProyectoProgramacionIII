import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Pais} from './pais.model';
import {Proyecto} from './proyecto.model';
import {Cliente} from './cliente.model';

@model({
  settings: {
    foreignKeys: {
      fPaisId: {
        name: 'fPaisId',
        entity: 'Pais',
        entityKey: 'codigo',
        foreignKey: 'paisId',
      },
    },
  },
})
export class Ciudad extends Entity {
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
  nombre: string;

  @belongsTo(() => Pais)
  paisId: number;

  @hasMany(() => Proyecto)
  proyectos: Proyecto[];

  @hasMany(() => Cliente)
  clientes: Cliente[];

  constructor(data?: Partial<Ciudad>) {
    super(data);
  }
}

export interface CiudadRelations {
  // describe navigational properties here
}

export type CiudadWithRelations = Ciudad & CiudadRelations;
