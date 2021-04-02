import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  SolicitudInmueble,
  Pagos,
} from '../models';
import {SolicitudInmuebleRepository} from '../repositories';

export class SolicitudInmueblePagosController {
  constructor(
    @repository(SolicitudInmuebleRepository) protected solicitudInmuebleRepository: SolicitudInmuebleRepository,
  ) { }

  @get('/solicitud-inmuebles/{id}/pagos', {
    responses: {
      '200': {
        description: 'Array of SolicitudInmueble has many Pagos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pagos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Pagos>,
  ): Promise<Pagos[]> {
    return this.solicitudInmuebleRepository.pagos(id).find(filter);
  }

  @post('/solicitud-inmuebles/{id}/pagos', {
    responses: {
      '200': {
        description: 'SolicitudInmueble model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pagos)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof SolicitudInmueble.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pagos, {
            title: 'NewPagosInSolicitudInmueble',
            exclude: ['id'],
            optional: ['solicitudInmuebleId']
          }),
        },
      },
    }) pagos: Omit<Pagos, 'id'>,
  ): Promise<Pagos> {
    return this.solicitudInmuebleRepository.pagos(id).create(pagos);
  }

  @patch('/solicitud-inmuebles/{id}/pagos', {
    responses: {
      '200': {
        description: 'SolicitudInmueble.Pagos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pagos, {partial: true}),
        },
      },
    })
    pagos: Partial<Pagos>,
    @param.query.object('where', getWhereSchemaFor(Pagos)) where?: Where<Pagos>,
  ): Promise<Count> {
    return this.solicitudInmuebleRepository.pagos(id).patch(pagos, where);
  }

  @del('/solicitud-inmuebles/{id}/pagos', {
    responses: {
      '200': {
        description: 'SolicitudInmueble.Pagos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Pagos)) where?: Where<Pagos>,
  ): Promise<Count> {
    return this.solicitudInmuebleRepository.pagos(id).delete(where);
  }
}
