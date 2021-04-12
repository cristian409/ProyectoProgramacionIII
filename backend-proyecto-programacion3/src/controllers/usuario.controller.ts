import {service} from '@loopback/core';
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
<<<<<<< HEAD
  getModelSchemaRef, HttpErrors, param,
=======
  getModelSchemaRef, param,
>>>>>>> master


  patch, post,




  put,

  requestBody,
  response
} from '@loopback/rest';
<<<<<<< HEAD
import {Usuarios} from '../models';
import {Credenciales} from '../models/credenciales.model';
import {UsuariosRepository} from '../repositories';
import {JwtService} from '../services';
=======
import {Keys as llaves} from '../config/keys';
import {Usuarios} from '../models';
import {UsuariosRepository} from '../repositories';
import {GeneralFnService, NotificacionService} from '../services';

>>>>>>> master

export class UsuarioController {
  constructor(
    @repository(UsuariosRepository)
    public usuariosRepository: UsuariosRepository,
<<<<<<< HEAD
    @service(JwtService)
    public servicioJWT: JwtService
=======
    @service(GeneralFnService)
    public fnService: GeneralFnService,
    @service(NotificacionService)
    public servicioNotificacion: NotificacionService,
>>>>>>> master
  ) { }

  @post('/usuarios')
  @response(200, {
    description: 'Usuarios model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usuarios)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {
            title: 'NewUsuarios',
<<<<<<< HEAD
            exclude: ['id'],
=======
            exclude: ['id', 'contraseña'],
>>>>>>> master
          }),
        },
      },
    })
    usuarios: Omit<Usuarios, 'id'>,
  ): Promise<Usuarios> {
<<<<<<< HEAD
    return this.usuariosRepository.create(usuarios);
=======

    let claveAleatoria = this.fnService.generarClaveAleatoria();
    console.log(claveAleatoria);
    let claveCifrada = this.fnService.cifrarTextos(claveAleatoria);
    console.log(claveCifrada);
    usuarios.contraseña = claveCifrada;
    let usuarioNuevo = await this.usuariosRepository.create(usuarios);

    // notificamos al usuario
    let contenido = `<strong>Buen dia </strong> <br/> A sido registrado satisfactoriamente en el sistema de ventas. <br/>
                      sus datos de ingreso son: <br/><br/> Usuario: ${usuarios.email} <br/> Contraseña: ${claveAleatoria}<br/><br/>
                      Recuerde cambiar la contraseña al hacer su primer ingreso. Muchas gracias`;
    this.servicioNotificacion.enviarEmail(usuarios.email, llaves.asuntoRegistroUsuario, contenido);

    return usuarioNuevo;
>>>>>>> master
  }

  @get('/usuarios/count')
  @response(200, {
    description: 'Usuarios model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Usuarios) where?: Where<Usuarios>,
  ): Promise<Count> {
    return this.usuariosRepository.count(where);
  }

  @get('/usuarios')
  @response(200, {
    description: 'Array of Usuarios model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usuarios, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Usuarios) filter?: Filter<Usuarios>,
  ): Promise<Usuarios[]> {
    return this.usuariosRepository.find(filter);
  }

  @patch('/usuarios')
  @response(200, {
    description: 'Usuarios PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {partial: true}),
        },
      },
    })
    usuarios: Usuarios,
    @param.where(Usuarios) where?: Where<Usuarios>,
  ): Promise<Count> {
    return this.usuariosRepository.updateAll(usuarios, where);
  }

  @get('/usuarios/{id}')
  @response(200, {
    description: 'Usuarios model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuarios, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Usuarios, {exclude: 'where'}) filter?: FilterExcludingWhere<Usuarios>
  ): Promise<Usuarios> {
    return this.usuariosRepository.findById(id, filter);
  }

  @patch('/usuarios/{id}')
  @response(204, {
    description: 'Usuarios PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {partial: true}),
        },
      },
    })
    usuarios: Usuarios,
  ): Promise<void> {
    await this.usuariosRepository.updateById(id, usuarios);
  }

  @put('/usuarios/{id}')
  @response(204, {
    description: 'Usuarios PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() usuarios: Usuarios,
  ): Promise<void> {
    await this.usuariosRepository.replaceById(id, usuarios);
  }

  @del('/usuarios/{id}')
  @response(204, {
    description: 'Usuarios DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usuariosRepository.deleteById(id);
  }
<<<<<<< HEAD

  @post('/identificar')
  @response(200, {
    description: 'Identificación de usuarios'
  })
  async identificar(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Credenciales),
        },
      },
    }) credenciales: Credenciales
  ): Promise<object> {
    const usuario = await this.usuariosRepository.findOne({where: {email: credenciales.correo, clave: credenciales.clave}});
    if (usuario) {
      const tk = this.servicioJWT.crearTokenJWT(usuario);
      usuario.clave = '';
      return {
        user: usuario,
        token: tk
      };
    } else {
      throw new HttpErrors[401]("Usuario o clave incorrecto.")
    }
  }
=======
>>>>>>> master
}
