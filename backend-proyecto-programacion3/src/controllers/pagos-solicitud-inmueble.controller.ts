import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Pagos,
  SolicitudInmueble,
} from '../models';
import {PagosRepository} from '../repositories';

export class PagosSolicitudInmuebleController {
  constructor(
    @repository(PagosRepository)
    public pagosRepository: PagosRepository,
  ) { }

  @get('/pagos/{id}/solicitud-inmueble', {
    responses: {
      '200': {
        description: 'SolicitudInmueble belonging to Pagos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SolicitudInmueble)},
          },
        },
      },
    },
  })
  async getSolicitudInmueble(
    @param.path.number('id') id: typeof Pagos.prototype.id,
  ): Promise<SolicitudInmueble> {
    return this.pagosRepository.solicitudInmueble(id);
  }
}
