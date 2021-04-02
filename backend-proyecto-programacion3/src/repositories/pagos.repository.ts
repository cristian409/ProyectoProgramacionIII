import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Pagos, PagosRelations, SolicitudInmueble} from '../models';
import {SolicitudInmuebleRepository} from './solicitud-inmueble.repository';

export class PagosRepository extends DefaultCrudRepository<
  Pagos,
  typeof Pagos.prototype.id,
  PagosRelations
> {

  public readonly solicitudInmueble: BelongsToAccessor<SolicitudInmueble, typeof Pagos.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('SolicitudInmuebleRepository') protected solicitudInmuebleRepositoryGetter: Getter<SolicitudInmuebleRepository>,
  ) {
    super(Pagos, dataSource);
    this.solicitudInmueble = this.createBelongsToAccessorFor('solicitudInmueble', solicitudInmuebleRepositoryGetter,);
    this.registerInclusionResolver('solicitudInmueble', this.solicitudInmueble.inclusionResolver);
  }
}
