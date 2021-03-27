import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-crudclock',
  templateUrl: './crudclock.page.html',
  styleUrls: ['./crudclock.page.scss'],
})
export class CrudclockPage implements OnInit {
  clock: any;

  constructor(public navCtrl: NavController) {}

  ngOnInit() {
  }

  goback() {
    fetch('./assets/data-myclock/myclock.json').then(res => res.json()).then(json => {
      console.log('clock log from JSON ## ', json);
      this.clock = json;
    });
    this.navCtrl.pop();
  }
}
