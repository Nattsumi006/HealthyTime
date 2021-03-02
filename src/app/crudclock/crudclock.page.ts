import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-crudclock',
  templateUrl: './crudclock.page.html',
  styleUrls: ['./crudclock.page.scss'],
})
export class CrudclockPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  goback() {
    this.navCtrl.pop();
  }

  ngOnInit() {
  }

}
