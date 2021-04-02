import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Cliente} from './cliente.model';

@model({
  settings: {
    foreignKeys: {
      fkFinancieraClienteId: {
        name: 'fkFinancieraClienteId',
        entity: 'Cliente',
        entityKey: 'id',
        foreignKey: 'clienteId',
      },
    },
  },
})
export class Financiera extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  totalIngresos: number;

  @property({
    type: 'string',
    required: true,
  })
  datosTrabajo: string;

  @property({
    type: 'string',
    required: true,
  })
  tiempoTrabajoActual: string;

  @property({
    type: 'string',
    required: true,
  })
  nombreReferenciaFamiliar: string;

  @property({
    type: 'number',
    required: true,
  })
  telefonoReferenciaFamiliar: number;

  @property({
    type: 'string',
    required: true,
  })
  nombreReferenciaPersonal: string;

  @property({
    type: 'number',
    required: true,
  })
  telefonoReferenciaPersonal: number;

  @belongsTo(() => Cliente)
  clienteId: number;

  constructor(data?: Partial<Financiera>) {
    super(data);
  }
}

export interface FinancieraRelations {
  // describe navigational properties here
}

export type FinancieraWithRelations = Financiera & FinancieraRelations;
