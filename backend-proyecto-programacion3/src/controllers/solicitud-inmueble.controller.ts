import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {SolicitudInmueble} from '../models';
import {SolicitudInmuebleRepository} from '../repositories';

@authenticate('admin', 'vendedor')
export class SolicitudInmuebleController {
  constructor(
    @repository(SolicitudInmuebleRepository)
    public solicitudInmuebleRepository: SolicitudInmuebleRepository,
  ) { }

  @post('/solicitud-inmuebles')
  @response(200, {
    description: 'SolicitudInmueble model instance',
    content: {'application/json': {schema: getModelSchemaRef(SolicitudInmueble)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudInmueble, {
            title: 'NewSolicitudInmueble',
            exclude: ['id'],
          }),
        },
      },
    })
    solicitudInmueble: Omit<SolicitudInmueble, 'id'>,
  ): Promise<SolicitudInmueble> {
    return this.solicitudInmuebleRepository.create(solicitudInmueble);
  }

  @get('/solicitud-inmuebles/count')
  @response(200, {
    description: 'SolicitudInmueble model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SolicitudInmueble) where?: Where<SolicitudInmueble>,
  ): Promise<Count> {
    return this.solicitudInmuebleRepository.count(where);
  }

  @get('/solicitud-inmuebles')
  @response(200, {
    description: 'Array of SolicitudInmueble model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SolicitudInmueble, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SolicitudInmueble) filter?: Filter<SolicitudInmueble>,
  ): Promise<SolicitudInmueble[]> {
    return this.solicitudInmuebleRepository.find(filter);
  }

  @patch('/solicitud-inmuebles')
  @response(200, {
    description: 'SolicitudInmueble PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudInmueble, {partial: true}),
        },
      },
    })
    solicitudInmueble: SolicitudInmueble,
    @param.where(SolicitudInmueble) where?: Where<SolicitudInmueble>,
  ): Promise<Count> {
    return this.solicitudInmuebleRepository.updateAll(solicitudInmueble, where);
  }

  @get('/solicitud-inmuebles/{id}')
  @response(200, {
    description: 'SolicitudInmueble model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SolicitudInmueble, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(SolicitudInmueble, {exclude: 'where'}) filter?: FilterExcludingWhere<SolicitudInmueble>
  ): Promise<SolicitudInmueble> {
    return this.solicitudInmuebleRepository.findById(id, filter);
  }

  @patch('/solicitud-inmuebles/{id}')
  @response(204, {
    description: 'SolicitudInmueble PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudInmueble, {partial: true}),
        },
      },
    })
    solicitudInmueble: SolicitudInmueble,
  ): Promise<void> {
    await this.solicitudInmuebleRepository.updateById(id, solicitudInmueble);
  }

  @put('/solicitud-inmuebles/{id}')
  @response(204, {
    description: 'SolicitudInmueble PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() solicitudInmueble: SolicitudInmueble,
  ): Promise<void> {
    await this.solicitudInmuebleRepository.replaceById(id, solicitudInmueble);
  }

  @del('/solicitud-inmuebles/{id}')
  @response(204, {
    description: 'SolicitudInmueble DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.solicitudInmuebleRepository.deleteById(id);
  }
}
