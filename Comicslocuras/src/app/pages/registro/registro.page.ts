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
  // Método para mostrar una alerta de éxito al registrar al usuario
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'REGISTRO',
      message: 'Registrado con Exito!',
      buttons: ['ok'],
    });

    await alert.present();
  }  

  constructor(private router:Router, private alertController: AlertController) { }
 // Método para registrar al usuario, valida los datos y muestra una alerta de éxito
registrar() {
    if (this.validarEmail(this.objetoRegistro.email) && this.validarContrasena(this.objetoRegistro.contrasena)) {
      console.log('Registro exitoso:', this.objetoRegistro);
      this.presentAlert();
      
    } else {
      console.log('Validaciones fallidas');
    }
  }



// Método para validar el correo
  validarEmail(email: string): boolean {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  }
//lo mismo pero con la contraseña
  validarContrasena(contrasena: string): boolean {
    const contrasenaRegex = /[!@#$%^&*(),.?":{}|<>]/;
    return contrasenaRegex.test(contrasena);
  }

  ngOnInit() {
  }


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

