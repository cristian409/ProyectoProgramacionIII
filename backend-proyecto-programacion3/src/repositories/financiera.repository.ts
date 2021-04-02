import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Cliente, Financiera, FinancieraRelations} from '../models';
import {ClienteRepository} from './cliente.repository';

export class FinancieraRepository extends DefaultCrudRepository<
  Financiera,
  typeof Financiera.prototype.id,
  FinancieraRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Financiera.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Financiera, dataSource);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);

  }
}
