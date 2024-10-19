import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  verMenu = true; //CY3rto  menu==true para afirmar la apertura de este  :v
 
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkMenuVisibility(event.url);
      }
    });
  }

  checkMenuVisibility(url: string) {

    // Ojo aqui abajo se señalan donde no se debe ver el menu o nos funaran
    const noveras = ['/login', '/registro', '/verperfil','/editarperfil', 
                    '/recuperarcontrase', '/cambiocontrase','/notfound','/registroventa'];

    this.verMenu = !noveras.includes(url);
  }
}
