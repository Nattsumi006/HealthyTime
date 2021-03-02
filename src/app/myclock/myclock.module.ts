import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyclockPageRoutingModule } from './myclock-routing.module';

import { MyclockPage } from './myclock.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyclockPageRoutingModule
  ],
  declarations: [MyclockPage]
})
export class MyclockPageModule {}
