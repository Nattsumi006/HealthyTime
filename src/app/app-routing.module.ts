import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
//import { HTTP } from '@ionic-native/http/ngx';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'myclock/:dataMyclock',
    loadChildren: () => import('./myclock/myclock.module').then( m => m.MyclockPageModule)
  },
  {
    path: 'history/:dataHistory',
    loadChildren: () => import('./history/history.module').then( m => m.HistoryPageModule)
  },
  {
    path: 'event/:dataEvent',
    loadChildren: () => import('./event/event.module').then( m => m.EventPageModule)
  },
  {
    path: 'crudclock/:dataMyclock',
    loadChildren: () => import('./crudclock/crudclock.module').then( m => m.CrudclockPageModule)
  },
  {
    path: 'signup/:Member',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'login/:dataMember',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'homeii/:dMember',
    loadChildren: () => import('./homeii/homeii.module').then( m => m.HomeiiPageModule)
  },
  {
    path: 'homeii/:dataMyclock',
    loadChildren: () => import('./homeii/homeii.module').then( m => m.HomeiiPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
