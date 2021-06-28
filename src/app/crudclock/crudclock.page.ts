import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-crudclock',
  templateUrl: './crudclock.page.html',
  styleUrls: ['./crudclock.page.scss'],
})
export class CrudclockPage implements OnInit {
  myclock = {"dataclock":[],"headclock":[]};
  name: string;
  color: string;
  nexti: number;
  time = ['00:00-03:00', '03:00-05:00', '05:00-07:00', '07:00-09:00', '09:00-11:00', '11:00-13:00', '13:00-15:00',
          '15:00-17:00', '17:00-19:00', '19:00-21:00', '21:00-23:00', '23:00-00:00'];
  dataclock = new Array();
  default = [];
  obj =[];


  constructor(
    public navCtrl: NavController , 
    public alertCtrl: AlertController,
    private activaterroute: ActivatedRoute) {}

  ngOnInit() {
    const dataRecv = this.activaterroute.snapshot.paramMap.get('dataMyclock');
    this.obj = JSON.parse(dataRecv);
    if (this.obj[0].index != null) {
      console.log('obj : ',this.obj);
      this.name = this.obj[0].dataMyclock.headclock[this.obj[0].index].name;
      this.color = this.obj[0].dataMyclock.headclock[this.obj[0].index].color;
      this.nexti = this.obj[0].dataMyclock.headclock.length;

      this.dataclock.push(this.obj[0].dataMyclock.dataclock[this.obj[0].index]);
      console.log('dataclock : ',this.dataclock);
    } else {
      this.nexti = this.obj[0].dataMyclock.headclock.length;
      for (let i = 0; i < 12; i++) {
        this.default.push({"time":this.time[i],"details":"ว่าง"});
      }this.dataclock.push(this.default);
      console.log('dataclock : ',this.obj,this.dataclock);
    }

  }
  save(){
    for (let i= 0; i < this.nexti; i++) {
      this.myclock.headclock.push(this.obj[0].dataMyclock.headclock[i]);
      this.myclock.dataclock.push(this.obj[0].dataMyclock.dataclock[i]);
    }
    this.myclock.headclock.push({"name":this.name,"indexclock":this.nexti,"color":this.color});
    this.myclock.dataclock.push(this.dataclock);

    const dataMyclock = JSON.stringify(this.myclock);
    this.navCtrl.navigateForward(['myclock',dataMyclock]);
  }
  goback(){
    this.navCtrl.pop();
  }

}
