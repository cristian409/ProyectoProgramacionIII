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
import {Financiera} from '../models';
import {FinancieraRepository} from '../repositories';

export class FinancieraController {
  constructor(
    @repository(FinancieraRepository)
    public financieraRepository: FinancieraRepository,
  ) { }

  @post('/financieras')
  @response(200, {
    description: 'Financiera model instance',
    content: {'application/json': {schema: getModelSchemaRef(Financiera)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Financiera, {
            title: 'NewFinanciera',
            exclude: ['id'],
          }),
        },
      },
    })
    financiera: Omit<Financiera, 'id'>,
  ): Promise<Financiera> {
    return this.financieraRepository.create(financiera);
  }

  @get('/financieras/count')
  @response(200, {
    description: 'Financiera model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Financiera) where?: Where<Financiera>,
  ): Promise<Count> {
    return this.financieraRepository.count(where);
  }

  @get('/financieras')
  @response(200, {
    description: 'Array of Financiera model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Financiera, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Financiera) filter?: Filter<Financiera>,
  ): Promise<Financiera[]> {
    return this.financieraRepository.find(filter);
  }

  @patch('/financieras')
  @response(200, {
    description: 'Financiera PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Financiera, {partial: true}),
        },
      },
    })
    financiera: Financiera,
    @param.where(Financiera) where?: Where<Financiera>,
  ): Promise<Count> {
    return this.financieraRepository.updateAll(financiera, where);
  }

  @get('/financieras/{id}')
  @response(200, {
    description: 'Financiera model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Financiera, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Financiera, {exclude: 'where'}) filter?: FilterExcludingWhere<Financiera>
  ): Promise<Financiera> {
    return this.financieraRepository.findById(id, filter);
  }

  @patch('/financieras/{id}')
  @response(204, {
    description: 'Financiera PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Financiera, {partial: true}),
        },
      },
    })
    financiera: Financiera,
  ): Promise<void> {
    await this.financieraRepository.updateById(id, financiera);
  }

  @put('/financieras/{id}')
  @response(204, {
    description: 'Financiera PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() financiera: Financiera,
  ): Promise<void> {
    await this.financieraRepository.replaceById(id, financiera);
  }

  @del('/financieras/{id}')
  @response(204, {
    description: 'Financiera DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.financieraRepository.deleteById(id);
  }
}
