import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Financiera, FinancieraRelations} from '../models';

export class FinancieraRepository extends DefaultCrudRepository<
  Financiera,
  typeof Financiera.prototype.id,
  FinancieraRelations
> {
  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource,
  ) {
    super(Financiera, dataSource);
  }
}
