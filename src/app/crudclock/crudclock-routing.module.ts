import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrudclockPage } from './crudclock.page';

const routes: Routes = [
  {
    path: '',
    component: CrudclockPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudclockPageRoutingModule {}
