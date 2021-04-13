import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {JwtService} from '../services';


export class VendedorStrategy implements AuthenticationStrategy {
  name = 'vendedor';

  constructor(
    @service(JwtService)
    public servicioJWT: JwtService
  ) { }

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    const token = parseBearerToken(request)
    if (!token) {
      throw new HttpErrors[401]("No existe un token en la solicitud.")
    }
    const info = this.servicioJWT.verificarTokenJWT(token);
    if (info) {
      if (info.data.rol === '60679c0d6596e816a443f046') {
        const perfil: UserProfile = Object.assign({
          id: info.data.id,
          email: info.data.email,
          rol: info.data.rol
        });
        return perfil;
      } else {
        throw new HttpErrors[401]("El token es válido, pero no tiene los permisos suficiente para ejecutar esta acción.");
      }
    } else {
      throw new HttpErrors[401]("El token enviado no es válido.");

    }

  }
}
