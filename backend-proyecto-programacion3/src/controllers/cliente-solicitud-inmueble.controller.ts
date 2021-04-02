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
  Cliente,
  SolicitudInmueble,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteSolicitudInmuebleController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/solicitud-inmuebles', {
    responses: {
      '200': {
        description: 'Array of Cliente has many SolicitudInmueble',
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
    return this.clienteRepository.solicitudInmuebles(id).find(filter);
  }

  @post('/clientes/{id}/solicitud-inmuebles', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudInmueble)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudInmueble, {
            title: 'NewSolicitudInmuebleInCliente',
            exclude: ['id'],
            optional: ['clienteId']
          }),
        },
      },
    }) solicitudInmueble: Omit<SolicitudInmueble, 'id'>,
  ): Promise<SolicitudInmueble> {
    return this.clienteRepository.solicitudInmuebles(id).create(solicitudInmueble);
  }

  @patch('/clientes/{id}/solicitud-inmuebles', {
    responses: {
      '200': {
        description: 'Cliente.SolicitudInmueble PATCH success count',
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
    return this.clienteRepository.solicitudInmuebles(id).patch(solicitudInmueble, where);
  }

  @del('/clientes/{id}/solicitud-inmuebles', {
    responses: {
      '200': {
        description: 'Cliente.SolicitudInmueble DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(SolicitudInmueble)) where?: Where<SolicitudInmueble>,
  ): Promise<Count> {
    return this.clienteRepository.solicitudInmuebles(id).delete(where);
  }
}
