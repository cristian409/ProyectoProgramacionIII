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

  getModelSchemaRef, HttpErrors, param,





  patch, post,




  put,

  requestBody,
  response
} from '@loopback/rest';
import {Keys as llaves} from '../config/keys';
import {CambioContrasena, ResetearClave, Usuarios} from '../models';
import {Credenciales} from '../models/credenciales.model';
import {UsuariosRepository} from '../repositories';
import {GeneralFnService, JwtService, NotificacionService} from '../services';



export class UsuarioController {
  constructor(
    @repository(UsuariosRepository)
    public usuariosRepository: UsuariosRepository,
    @service(JwtService)
    public servicioJWT: JwtService,
    @service(GeneralFnService)
    public fnService: GeneralFnService,
    @service(NotificacionService)
    public servicioNotificacion: NotificacionService,
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
            exclude: ['id', 'contraseña'],
          }),
        },
      },
    })
    usuarios: Omit<Usuarios, 'id'>,
  ): Promise<Usuarios> {

    const claveAleatoria = this.fnService.generarClaveAleatoria();
    console.log(claveAleatoria);
    const claveCifrada = this.fnService.cifrarTextos(claveAleatoria);
    console.log(claveCifrada);
    usuarios.contraseña = claveCifrada;
    const usuarioNuevo = await this.usuariosRepository.create(usuarios);

    // notificamos al usuario
    const contenido = `<strong>Buen dia </strong> <br/> A sido registrado satisfactoriamente en el sistema de ventas. <br/>
                      sus datos de ingreso son: <br/><br/> Usuario: ${usuarios.email} <br/> Contraseña: ${claveAleatoria}<br/><br/>
                      Recuerde cambiar la contraseña al hacer su primer ingreso. Muchas gracias`;
    this.servicioNotificacion.enviarEmail(usuarios.email, llaves.asuntoRegistroUsuario, contenido);

    return usuarioNuevo;
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
    const credenContraseña = this.fnService.cifrarTextos(credenciales.clave);
    const usuario = await this.usuariosRepository.findOne({where: {email: credenciales.correo, contraseña: credenContraseña}});

    if (usuario) {
      const tk = this.servicioJWT.crearTokenJWT(usuario);
      usuario.contraseña = '';
      return {
        user: usuario,
        token: tk
      };
    } else {
      throw new HttpErrors[401]("Usuario o clave incorrecto.")
    }
  }
  @post('/reset-password')
  @response(200, {
    description: 'Usuarios model instance',
    content: {'application/json': {schema: getModelSchemaRef(ResetearClave)}},
  })
  async resetPassword(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResetearClave),
        },
      },
    })
    resetearClave: ResetearClave,
  ): Promise<object> {
    const usuario = await this.usuariosRepository.findOne({where: {email: resetearClave.correo}})
    if (!usuario) {
      throw new HttpErrors[403]("No se encuentra el usuario.")
    }
    const codigoAleatorio = this.fnService.generarCodigoVerificacion();
    console.log(codigoAleatorio);

    // notificamos al usuario
    const contenido = `Buen dia ${usuario.nombre}, su codigo de verificacion es: ${codigoAleatorio}`;
    const enviado = this.servicioNotificacion.EnviarSMS(usuario.telefono, contenido);
    if (enviado) {
      return {
        enviado: "ok"
      };
    }

    return {
      enviado: "ko"
    };
  }

  @post('/cambioContrasena')
  @response(200, {
    description: 'Cambio de contraseña de usuarios'
  })
  async cambioContrasena(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CambioContrasena),
        },
      },
    }) cambio: CambioContrasena
  ): Promise<Usuarios> {
    /**
     * Lo que podemos hacer:
     * Notificar al usuario el cambio de contraseña (por email o por sms)
     * Busqueda en base de datos si hay un correo igual
     *
     */
    const actual = this.fnService.cifrarTextos(cambio.contrasena_actual);
    const nueva = this.fnService.cifrarTextos(cambio.contrasena_nueva);
    const usuario = await this.usuariosRepository.findOne({where: {contraseña: actual}});
    if (usuario) {
      usuario.contraseña = nueva;
      await this.usuariosRepository.replaceById(usuario.id, usuario);
      return usuario;
    } else {
      throw new HttpErrors[401]("Clave actual erronea, verifique su clave.")
    }
  }
}
