
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  // Objeto que almacena los datos del registro del usuario
  objetoRegistro = {
    nombre: '',
    email: '',
    contrasena: ''
  };

  constructor(private router: Router, private alertController: AlertController) { }

  ngOnInit() { }

  // Método para mostrar una alerta de éxito al registrar al usuario
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'REGISTRO',
      message: '¡Registrado con éxito!',
      buttons: ['OK'],
    });

    await alert.present();
  }

  // Método para registrar al usuario, valida los datos y muestra una alerta de éxito
  registrar() {
    if (this.validarEmail(this.objetoRegistro.email) && this.validarContrasena(this.objetoRegistro.contrasena)) {
      console.log('Registro exitoso:', this.objetoRegistro);
      this.presentAlert();
    } else {
      console.log('Validaciones fallidas');
      if (!this.validarEmail(this.objetoRegistro.email)) {
        console.log('Correo inválido');
        // Podrías agregar una alerta o mensaje visual aquí
      }
      if (!this.validarContrasena(this.objetoRegistro.contrasena)) {
        console.log('Contraseña inválida. Debe tener entre 6 y 8 caracteres y al menos un carácter especial.');
        // Podrías agregar una alerta o mensaje visual aquí
      }
    }
  }

   //Método para validar el correo
  validarEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }


  // Método para validar la contraseña
  validarContrasena(contrasena: string): boolean {
    const longitudValida = contrasena.length >= 6 && contrasena.length <= 8;
    const contieneCaracterEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(contrasena);
    return longitudValida && contieneCaracterEspecial;
  }

  // Método para enviar los datos del registro y navegar al login
  regienvia() {
    const navigationExtras: NavigationExtras = {
      state: {
        objetoRegistro: this.objetoRegistro
      }
    };
    this.router.navigate(['/login'], navigationExtras);
    // Registra al usuario y muestra una alerta
    this.registrar();
  }
}

function validarEmail(email: any, string: any) {
  throw new Error('Function not implemented.');
}
