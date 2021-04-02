import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {SolicitudInmueble, SolicitudInmuebleRelations, Inmueble, Pagos, Cliente} from '../models';
import {InmuebleRepository} from './inmueble.repository';
import {PagosRepository} from './pagos.repository';
import {ClienteRepository} from './cliente.repository';

export class SolicitudInmuebleRepository extends DefaultCrudRepository<
  SolicitudInmueble,
  typeof SolicitudInmueble.prototype.id,
  SolicitudInmuebleRelations
> {

  public readonly inmueble: BelongsToAccessor<Inmueble, typeof SolicitudInmueble.prototype.id>;

  public readonly pagos: HasManyRepositoryFactory<Pagos, typeof SolicitudInmueble.prototype.id>;

  public readonly cliente: BelongsToAccessor<Cliente, typeof SolicitudInmueble.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>, @repository.getter('PagosRepository') protected pagosRepositoryGetter: Getter<PagosRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(SolicitudInmueble, dataSource);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
    this.pagos = this.createHasManyRepositoryFactoryFor('pagos', pagosRepositoryGetter,);
    this.registerInclusionResolver('pagos', this.pagos.inclusionResolver);
    this.inmueble = this.createBelongsToAccessorFor('inmueble', inmuebleRepositoryGetter,);
    this.registerInclusionResolver('inmueble', this.inmueble.inclusionResolver);
  }
}
