import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { StorageService } from 'src/app/services/servicebd.service';


/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//AGREGAR
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
 
  id: string = "";
  nombre:string = "";
  precio: string = "";
  stock: string = "";
  descripcion: string = "";
  foto: string = "";

  constructor(private bd: StorageService,private alertCtrl: AlertController) { }



  ngOnInit(): void {
    // Aquí puedes agregar lógica de inicialización si es necesario
  }



  


  async agregarProducto() {
    // Obtenemos los valores de los campos
    const nombre = (document.querySelector('ion-input[name="nombre"]') as HTMLInputElement).value;
    const descripcion = (document.querySelector('ion-textarea[name="descripcion"]') as HTMLTextAreaElement).value;
    const imagen = (document.querySelector('ion-input[name="imagen"]') as HTMLInputElement).value;
    const pagina = (document.querySelector('ion-select[name="pagina"]') as HTMLSelectElement).value;

    // Validamos los campos
    if (!nombre || !descripcion || !imagen || !pagina || !/^https?:\/\//.test(imagen)) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Por favor completa todos los campos correctamente. Asegúrate de que la URL de la imagen sea válida.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }else{
      const alert = await this.alertCtrl.create({
        header: 'Éxito',
        message: 'Producto agregado correctamente',
        buttons: ['OK'],
      });
      await alert.present();
      this.bd.insertarCrud(this.id, this.nombre, this.precio, this.stock, this.descripcion, this.foto);
      
    }

    // Lógica para agregar el producto...

    
  }
}

