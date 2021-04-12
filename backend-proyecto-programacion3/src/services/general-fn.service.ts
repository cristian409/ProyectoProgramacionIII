import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {generate} from 'generate-password';


const cryptoJS = require("crypto-js");

@injectable({scope: BindingScope.TRANSIENT})
export class GeneralFnService {
  constructor(/* Add @inject to inject parameters */) { }

  //Funcion para generar las constraseñas aleatorias de usuarios
  generarClaveAleatoria(): string {
    let pass = generate({
      length: 10,
      numbers: true,
      uppercase: true,
      lowercase: true
    });
    return pass;
  }

  //Funcion para el cifrado de textos(contraseñas)
  cifrarTextos(texto: string): string {
    //let textoEnc = cryptoJS.AES.encrypt(texto, llaves.AESKeys).toString();
    let textoEnc = cryptoJS.MD5(texto).toString();
    return textoEnc;
  }
}
