import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-myclock',
  templateUrl: './myclock.page.html',
  styleUrls: ['./myclock.page.scss'],
})
export class MyclockPage implements OnInit {
  myclock: any;

  constructor(public navCtrl: NavController, ) {this.initializeApp(); }

  initializeApp(){
    fetch('./assets/data-myclock/headclock.json').then(res => res.json()).then(json => {

      this.myclock = json;
    });
  }

  ngOnInit() {
  }

  edit(i, n){
    console.log('edit clock', i , 'name :', n);
  }
  gotoPage(i: string) {
    this.navCtrl.navigateForward(i);
  }
  createMyclock(){
    this.navCtrl.navigateForward('crudclock');
  }
  downloadClock(){
    console.log('downloadClock is selected');
  }
  uploadClock(){
    console.log('uploadClock is selected');
  }

}
