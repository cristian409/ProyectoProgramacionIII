import {belongsTo, Entity, model, property} from '@loopback/repository';
import {SolicitudInmueble} from './solicitud-inmueble.model';

@model({
  settings: {
    foreignKeys: {
      fkSolicitudInmuebleId: {
        name: 'fkSolicitudInmuebleId',
        entity: 'SolicitudInmueble',
        entityKey: 'id',
        foreignKey: 'solicitudInmuebleId',
      },
    },
  },
})
export class Pagos extends Entity {
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
  comprobante: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @belongsTo(() => SolicitudInmueble)
  solicitudInmuebleId: number;

  constructor(data?: Partial<Pagos>) {
    super(data);
  }
}

export interface PagosRelations {
  // describe navigational properties here
}

export type PagosWithRelations = Pagos & PagosRelations;
