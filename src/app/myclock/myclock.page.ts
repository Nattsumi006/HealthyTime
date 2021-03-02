import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-myclock',
  templateUrl: './myclock.page.html',
  styleUrls: ['./myclock.page.scss'],
})
export class MyclockPage implements OnInit {
  myclock: any;

  constructor(public navCtrl: NavController,) {this.initializeApp();}

  initializeApp(){
    fetch('./assets/data-myclock/myclock.json').then(res => res.json()).then(json => {
      console.log('datamyclock log from JSON ## ', json);
      this.myclock = json;
    });
  }

  ngOnInit() {
  }

  goback() {
    this.navCtrl.pop();
  }
  gotoPage(i: string) {
    this.navCtrl.navigateForward(i);
  }

}
