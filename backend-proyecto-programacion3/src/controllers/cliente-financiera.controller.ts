import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  Cliente,
  Financiera
} from '../models';
import {ClienteRepository} from '../repositories';


export class ClienteFinancieraController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/financiera', {
    responses: {
      '200': {
        description: 'Cliente has one Financiera',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Financiera),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Financiera>,
  ): Promise<Financiera> {
    return this.clienteRepository.financiera(id).get(filter);
  }

  @post('/clientes/{id}/financiera', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Financiera)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Financiera, {
            title: 'NewFinancieraInCliente',
            exclude: ['id'],
            optional: ['clienteId']
          }),
        },
      },
    }) financiera: Omit<Financiera, 'id'>,
  ): Promise<Financiera> {
    return this.clienteRepository.financiera(id).create(financiera);
  }

  @patch('/clientes/{id}/financiera', {
    responses: {
      '200': {
        description: 'Cliente.Financiera PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Financiera, {partial: true}),
        },
      },
    })
    financiera: Partial<Financiera>,
    @param.query.object('where', getWhereSchemaFor(Financiera)) where?: Where<Financiera>,
  ): Promise<Count> {
    return this.clienteRepository.financiera(id).patch(financiera, where);
  }

  @del('/clientes/{id}/financiera', {
    responses: {
      '200': {
        description: 'Cliente.Financiera DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Financiera)) where?: Where<Financiera>,
  ): Promise<Count> {
    return this.clienteRepository.financiera(id).delete(where);
  }
}
