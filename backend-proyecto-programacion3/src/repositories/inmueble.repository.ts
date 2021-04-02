import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Inmueble, InmuebleRelations, Bloque, SolicitudInmueble} from '../models';
import {BloqueRepository} from './bloque.repository';
import {SolicitudInmuebleRepository} from './solicitud-inmueble.repository';

export class InmuebleRepository extends DefaultCrudRepository<
  Inmueble,
  typeof Inmueble.prototype.codigo,
  InmuebleRelations
> {

  public readonly bloque: BelongsToAccessor<Bloque, typeof Inmueble.prototype.codigo>;

  public readonly solicitudInmuebles: HasManyRepositoryFactory<SolicitudInmueble, typeof Inmueble.prototype.codigo>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('BloqueRepository') protected bloqueRepositoryGetter: Getter<BloqueRepository>, @repository.getter('SolicitudInmuebleRepository') protected solicitudInmuebleRepositoryGetter: Getter<SolicitudInmuebleRepository>,
  ) {
    super(Inmueble, dataSource);
    this.solicitudInmuebles = this.createHasManyRepositoryFactoryFor('solicitudInmuebles', solicitudInmuebleRepositoryGetter,);
    this.registerInclusionResolver('solicitudInmuebles', this.solicitudInmuebles.inclusionResolver);
    this.bloque = this.createBelongsToAccessorFor('bloque', bloqueRepositoryGetter,);
    this.registerInclusionResolver('bloque', this.bloque.inclusionResolver);
  }
}
