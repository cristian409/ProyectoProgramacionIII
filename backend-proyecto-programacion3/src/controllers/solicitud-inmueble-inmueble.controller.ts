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
  Inmueble,
} from '../models';
import {SolicitudInmuebleRepository} from '../repositories';

export class SolicitudInmuebleInmuebleController {
  constructor(
    @repository(SolicitudInmuebleRepository)
    public solicitudInmuebleRepository: SolicitudInmuebleRepository,
  ) { }

  @get('/solicitud-inmuebles/{id}/inmueble', {
    responses: {
      '200': {
        description: 'Inmueble belonging to SolicitudInmueble',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Inmueble)},
          },
        },
      },
    },
  })
  async getInmueble(
    @param.path.number('id') id: typeof SolicitudInmueble.prototype.id,
  ): Promise<Inmueble> {
    return this.solicitudInmuebleRepository.inmueble(id);
  }
}
