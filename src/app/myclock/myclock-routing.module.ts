import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyclockPage } from './myclock.page';

const routes: Routes = [
  {
    path: '',
    component: MyclockPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyclockPageRoutingModule {}
