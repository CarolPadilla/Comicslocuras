import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { StorageService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  correo: string = "";
  clave: string = "";
  valor: any;
  constructor(private router: Router, private bd: StorageService) {

  }
  ingresar() {
    //tomar los datos del formulario y verificar si existen en la tabla de BD
    this.valor = this.bd.login(this.correo, this.clave);
    //this.bd.presentAlert("Texto:", "a:"+this.valor+":b");
    if(this.valor != 0){
      let navigationExtras: NavigationExtras= {
        state: {
          iduser: this.valor
        }
      }
      //cargar los observables de los productos y de las categorias
      this.bd.seleccionarCategoria();
      this.bd.seleccionarCrud();
      this.router.navigate(['/home'], navigationExtras);
    }
  }

  //fuincion solo para prueba debe ser eliminada junto con su elemento en html
  ingresar2(){
    this.bd.seleccionarCategoria();
      this.bd.seleccionarCrud();
      this.router.navigate(['/home']);
  }

  ngOnInit() {
  }


}
