import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

   // Definir objeto
   formData = {
    email: '',
    contrasena: ''
  };

 
// Objeto de comparación para usuario admin
  objetoComparacion2 = {
    nombre: 'admin',
    email: 'admin@gmail.com',
    contrasena: 'admin1234'
  };  

// Objeto para almacenar datos del usuario ya registrado
  objetoRegistro = {
    email: '',
    contrasena: ''
  };

  //alerta
  async presentAlert() {
    const alert = await this.alertController.create({
      header: ' INGRESO ',
      message: 'Has ingresado como Admin',
      buttons: ['ok'],
    });

    await alert.present()
  }
//alerta
  async presentAlert1() {
    const alert = await this.alertController.create({
      header: ' INGRESO ',
      message: 'Ingreso correcto!',
      buttons: ['ok'],
    });

    await alert.present()
  }
//alerta
  async presentAlert2() {
    const alert = await this.alertController.create({
      header: ' INGRESO ',
      message: 'No esta registrado o los datos no coinciden',
      buttons: ['ok'],
    });

    await alert.present()
  }
  
  constructor(private router: Router, private alertController: AlertController) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state && navigation.extras.state['objetoRegistro']) {
      this.objetoRegistro = navigation.extras.state['objetoRegistro'];
    }
  }

  registrar() {
      

    //console.log('formData:', this.formData);
    //console.log('objetoComparacion2:', this.objetoComparacion2);
    //console.log('objetoRegistro:', this.objetoRegistro);

    //  admin
     // Compara los datos del formulario con el objeto administrador
    const administrador = this.compararObjetos(this.formData, this.objetoComparacion2);
    // usuario 
    const usuarioPolado = this.objetoRegistro.email && this.compararObjetos(this.formData, this.objetoRegistro);
 // Compara los datos del formulario con el objeto de usuario registrado

 // Redirige y muestra alerta 
    if (administrador) {
      this.router.navigate(['/home']);
      this.presentAlert();
    } else if (usuarioPolado) {
      this.router.navigate(['/home']);
      this.presentAlert1();
    } else {
      console.log('Los datos no coinciden con ninguno de los objetos');
      this.presentAlert2();
    }  //alerta en caso de que el usuario no este registrado
  }
//objetos basados en correo y la contraseña
  compararObjetos(obj1: any, obj2: any): boolean {
    return obj1.email === obj2.email &&
           obj1.contrasena === obj2.contrasena;
  }

  ngOnInit() {
  }

  irPagina() {
    this.router.navigate(['/recuperacontrase']);
    this.router.navigate(['/registro']);
  }
}
