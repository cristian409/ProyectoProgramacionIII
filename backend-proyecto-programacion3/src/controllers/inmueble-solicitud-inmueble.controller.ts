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
  Inmueble,
  SolicitudInmueble,
} from '../models';
import {InmuebleRepository} from '../repositories';

export class InmuebleSolicitudInmuebleController {
  constructor(
    @repository(InmuebleRepository) protected inmuebleRepository: InmuebleRepository,
  ) { }

  @get('/inmuebles/{id}/solicitud-inmuebles', {
    responses: {
      '200': {
        description: 'Array of Inmueble has many SolicitudInmueble',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SolicitudInmueble)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<SolicitudInmueble>,
  ): Promise<SolicitudInmueble[]> {
    return this.inmuebleRepository.solicitudInmuebles(id).find(filter);
  }

  @post('/inmuebles/{id}/solicitud-inmuebles', {
    responses: {
      '200': {
        description: 'Inmueble model instance',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudInmueble)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Inmueble.prototype.codigo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudInmueble, {
            title: 'NewSolicitudInmuebleInInmueble',
            exclude: ['id'],
            optional: ['inmuebleId']
          }),
        },
      },
    }) solicitudInmueble: Omit<SolicitudInmueble, 'id'>,
  ): Promise<SolicitudInmueble> {
    return this.inmuebleRepository.solicitudInmuebles(id).create(solicitudInmueble);
  }

  @patch('/inmuebles/{id}/solicitud-inmuebles', {
    responses: {
      '200': {
        description: 'Inmueble.SolicitudInmueble PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudInmueble, {partial: true}),
        },
      },
    })
    solicitudInmueble: Partial<SolicitudInmueble>,
    @param.query.object('where', getWhereSchemaFor(SolicitudInmueble)) where?: Where<SolicitudInmueble>,
  ): Promise<Count> {
    return this.inmuebleRepository.solicitudInmuebles(id).patch(solicitudInmueble, where);
  }

  @del('/inmuebles/{id}/solicitud-inmuebles', {
    responses: {
      '200': {
        description: 'Inmueble.SolicitudInmueble DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(SolicitudInmueble)) where?: Where<SolicitudInmueble>,
  ): Promise<Count> {
    return this.inmuebleRepository.solicitudInmuebles(id).delete(where);
  }
}
