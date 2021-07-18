import {belongsTo, Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {Ciudad} from './ciudad.model';
import {Financiera} from './financiera.model';
import {SolicitudInmueble} from './solicitud-inmueble.model';

@model({
  settings: {
    foreignKeys: {
      fCiudadId: {
        name: 'fCiudadId',
        entity: 'Ciudad',
        entityKey: 'codigo',
        foreignKey: 'ciudadId',
      },
    },
  },
})
export class Cliente extends Entity {
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
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  fechaNacimiento: string;

  @property({
    type: 'string',
    required: true,
  })
  fotografia: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @hasMany(() => SolicitudInmueble)
  solicitudInmuebles: SolicitudInmueble[];

  @hasOne(() => Financiera)
  financiera: Financiera;

  @belongsTo(() => Ciudad)
  ciudadId: number;

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
