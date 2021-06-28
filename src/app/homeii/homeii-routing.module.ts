import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeiiPage } from './homeii.page';

const routes: Routes = [
  {
    path: '',
    component: HomeiiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeiiPageRoutingModule {}
