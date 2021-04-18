import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Keys as llaves} from '../config/keys';

const sgMail = require('@sendgrid/mail');
let twilio = require('twilio');


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

  EnviarSMS(telefonoDestino: string, mensaje: string) {
    try {
      const accountSid = process.env.TWILIO_SID; // Your Account SID from www.twilio.com/console
      const authToken = process.env.TWILIO_TOKEN;   // Your Auth Token from www.twilio.com/console

      let client = new twilio(accountSid, authToken);

      client.messages.create({
        body: mensaje,
        to: telefonoDestino,  // Text this number
        from: llaves.twilioPhone // From a valid Twilio number
      }).then((message: any) => {
        console.log(message.sid);
        return true;
      });
      return true;
    } catch {
      return false;
    }
  }
}
