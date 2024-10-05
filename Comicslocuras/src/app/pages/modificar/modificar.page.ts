import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService  } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.page.html',
  styleUrls: ['./modificar.page.scss'],
})
export class ModificarPage implements OnInit {

  //titulo: string = "";
  //texto: string = "";
  id: string = "";
  nombre:string = "";
  precio: string = "";
  stock: string = "";
  descripcion: string = "";
  foto: string = "";
  
  Crud: any;

  constructor(private router: Router, private activedrouter: ActivatedRoute, private bd:StorageService  ) {
    this.activedrouter.queryParams.subscribe(res=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.Crud = this.router.getCurrentNavigation()?.extras?.state?.['Crud'];
      }
    })
   }

  ngOnInit() {
  }

  modificar(){
    //this.bd.presentAlert("Mod","ID: " + this.noticia.idnoticia)
    this.bd.modificarProducto(this.Crud.id_producto ,this.Crud.nombre_p, this.Crud.precio_p, this.Crud.stock, this.Crud.descripcion, this.Crud.foto_p);
  }
}

