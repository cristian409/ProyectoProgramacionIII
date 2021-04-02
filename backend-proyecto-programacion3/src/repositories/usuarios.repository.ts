import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbdsDataSource} from '../datasources';
import {Usuarios, UsuariosRelations} from '../models';

export class UsuariosRepository extends DefaultCrudRepository<
  Usuarios,
  typeof Usuarios.prototype.id,
  UsuariosRelations
> {
  constructor(
    @inject('datasources.mongodbds') dataSource: MongodbdsDataSource,
  ) {
    super(Usuarios, dataSource);
  }
}
