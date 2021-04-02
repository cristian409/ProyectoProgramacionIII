import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {SolicitudInmueble, SolicitudInmuebleRelations} from '../models';

export class SolicitudInmuebleRepository extends DefaultCrudRepository<
  SolicitudInmueble,
  typeof SolicitudInmueble.prototype.id,
  SolicitudInmuebleRelations
> {
  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource,
  ) {
    super(SolicitudInmueble, dataSource);
  }
}
