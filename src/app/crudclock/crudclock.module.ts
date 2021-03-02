import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrudclockPageRoutingModule } from './crudclock-routing.module';

import { CrudclockPage } from './crudclock.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrudclockPageRoutingModule
  ],
  declarations: [CrudclockPage]
})
export class CrudclockPageModule {}
