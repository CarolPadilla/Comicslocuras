import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerperfilPageRoutingModule } from './verperfil-routing.module';

import { VerperfilPage } from './verperfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerperfilPageRoutingModule
  ],
  declarations: [VerperfilPage]
})
export class VerperfilPageModule {}
