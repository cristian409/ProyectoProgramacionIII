import {Entity, model, property} from '@loopback/repository';

@model()
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


  constructor(data?: Partial<Financiera>) {
    super(data);
  }
}

export interface FinancieraRelations {
  // describe navigational properties here
}

export type FinancieraWithRelations = Financiera & FinancieraRelations;
