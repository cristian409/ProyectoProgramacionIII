import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, HasOneRepositoryFactory, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Cliente, ClienteRelations, Financiera, SolicitudInmueble, Ciudad} from '../models';
import {FinancieraRepository} from './financiera.repository';
import {SolicitudInmuebleRepository} from './solicitud-inmueble.repository';
import {CiudadRepository} from './ciudad.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly solicitudInmuebles: HasManyRepositoryFactory<SolicitudInmueble, typeof Cliente.prototype.id>;

  public readonly financiera: HasOneRepositoryFactory<Financiera, typeof Cliente.prototype.id>;

  public readonly ciudad: BelongsToAccessor<Ciudad, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('SolicitudInmuebleRepository') protected solicitudInmuebleRepositoryGetter: Getter<SolicitudInmuebleRepository>, @repository.getter('FinancieraRepository') protected financieraRepositoryGetter: Getter<FinancieraRepository>, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>,
  ) {
    super(Cliente, dataSource);
    this.ciudad = this.createBelongsToAccessorFor('ciudad', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudad', this.ciudad.inclusionResolver);
    this.financiera = this.createHasOneRepositoryFactoryFor('financiera', financieraRepositoryGetter);
    this.registerInclusionResolver('financiera', this.financiera.inclusionResolver);
    this.solicitudInmuebles = this.createHasManyRepositoryFactoryFor('solicitudInmuebles', solicitudInmuebleRepositoryGetter,);
    this.registerInclusionResolver('solicitudInmuebles', this.solicitudInmuebles.inclusionResolver);
  }
}
