import {Model, model, property} from '@loopback/repository';

@model()
export class CambioContrasena extends Model {

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  contrasena_actual: string;

  @property({
    type: 'string',
    required: true,
  })
  contrasena_nueva: string;


  constructor(data?: Partial<CambioContrasena>) {
    super(data);
  }
}

export interface CambioContrasenaRelations {
  // describe navigational properties here
}

export type CambioContrasenaWithRelations = CambioContrasena & CambioContrasenaRelations;
