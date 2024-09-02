import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ver-perfil',
  templateUrl: './verperfil.page.html',
  styleUrls: ['./verperfil.page.scss'],
})
export class VerPerfilPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  irPagina(){

    this.router.navigate(['/editarperfil']);
    this.router.navigate(['/home']);

  }

}
