import { Component } from '@angular/core';
import { Flashlight } from '@awesome-cordova-plugins/flashlight/ngx';

@Component({
  selector: 'app-flashlight',
  templateUrl: './flashlight.page.html',
  styleUrls: ['./flashlight.page.scss'],
})
export class FlashlightPage {

  constructor(private flashlight: Flashlight) {}

  // Encender la linterna
  turnOnFlashlight() {
    this.flashlight.switchOn().catch((error) => {
      console.error('Error al encender la linterna', error);
    });
  }

  // Apagar la linterna
  turnOffFlashlight() {
    this.flashlight.switchOff().catch((error) => {
      console.error('Error al apagar la linterna', error);
    });
  }

  // Alternar el estado de la linterna
  toggleFlashlight() {
    this.flashlight.toggle().catch((error) => {
      console.error('Error al alternar la linterna', error);
    });
  }
}
