import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Financiera,
  Cliente,
} from '../models';
import {FinancieraRepository} from '../repositories';

export class FinancieraClienteController {
  constructor(
    @repository(FinancieraRepository)
    public financieraRepository: FinancieraRepository,
  ) { }

  @get('/financieras/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to Financiera',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.number('id') id: typeof Financiera.prototype.id,
  ): Promise<Cliente> {
    return this.financieraRepository.cliente(id);
  }
}
