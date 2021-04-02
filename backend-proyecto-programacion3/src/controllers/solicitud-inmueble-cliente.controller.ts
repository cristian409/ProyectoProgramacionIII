import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  SolicitudInmueble,
  Cliente,
} from '../models';
import {SolicitudInmuebleRepository} from '../repositories';

export class SolicitudInmuebleClienteController {
  constructor(
    @repository(SolicitudInmuebleRepository)
    public solicitudInmuebleRepository: SolicitudInmuebleRepository,
  ) { }

  @get('/solicitud-inmuebles/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to SolicitudInmueble',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.number('id') id: typeof SolicitudInmueble.prototype.id,
  ): Promise<Cliente> {
    return this.solicitudInmuebleRepository.cliente(id);
  }
}
