import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeiiPageRoutingModule } from './homeii-routing.module';

import { HomeiiPage } from './homeii.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeiiPageRoutingModule
  ],
  declarations: [HomeiiPage]
})
export class HomeiiPageModule {}
