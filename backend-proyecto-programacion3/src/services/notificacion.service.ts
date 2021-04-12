import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Keys as llaves} from '../config/keys';

const sgMail = require('@sendgrid/mail');


@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionService {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   * Envio de notificacion por medio de correo electronico
   */

  enviarEmail(destino: string, asunto: string, contenido: string) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: destino, // Change to your recipient
      from: llaves.emailFrom, // Change to your verified sender
      subject: asunto,
      html: contenido,
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((err: any) => {
        console.error(err)
      })
  }
}
