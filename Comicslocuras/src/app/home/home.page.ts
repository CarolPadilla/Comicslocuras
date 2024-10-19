import { Component } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { StorageService } from '../services/servicebd.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  //productos: any;
  categorias: any;
  id_cat: any;

  constructor(private bd:StorageService, private router: Router) {
    
    this.bd.fetchCategoria().subscribe(res=>{
      this.categorias = res;
    });
   
  }

  irCategoria(manga:any){
    this.id_cat = manga.id_categoria;
    this.bd.seleccionarCrudCat(this.id_cat);
    this.router.navigate(['/mangas']);
  }

}
