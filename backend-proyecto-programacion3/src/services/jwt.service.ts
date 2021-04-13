import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Keys as llaves} from '../config/keys';
import {Usuarios} from '../models';

const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class JwtService {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   * Creación de un token jwt
   */
  crearTokenJWT(usuario: Usuarios) {
    const claveSecreta = llaves.jwtkey;
    const tk = jwt.sign({
      exp: llaves.expTimeJWT,
      data: {
        id: usuario.id,
        email: usuario.email,
        rol: usuario.rolId
      }
    }, claveSecreta);
    return tk;
  }

  verificarTokenJWT(token: string) {
    try {
      const decoded = jwt.verify(token, llaves.jwtkey);
      return decoded;
    } catch {
      return null;
    }
  }

}
