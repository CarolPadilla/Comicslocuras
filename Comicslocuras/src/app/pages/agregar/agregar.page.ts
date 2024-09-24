import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  constructor(private alertCtrl: AlertController) {}

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
    }

    // Lógica para agregar el producto...

    const alert = await this.alertCtrl.create({
      header: 'Éxito',
      message: 'Producto agregado correctamente',
      buttons: ['OK'],
    });
    await alert.present();
  }
}

