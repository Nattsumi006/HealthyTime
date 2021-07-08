import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';

//import { Network } from '@ionic-native/network/ngx';
//import { HTTP } from '@ionic-native/http/ngx';
//import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
//import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-myclock',
  templateUrl: './myclock.page.html',
  styleUrls: ['./myclock.page.scss'],
})
export class MyclockPage implements OnInit {
  myclock: any;
  headclock: any;
  editclock = new Array();
  createclock = new Array();

  constructor(public navCtrl: NavController,
    public toastController: ToastController,
    public loadingController: LoadingController,
    private activaterroute: ActivatedRoute) {}

  ngOnInit() {
    const dataMyclock = this.activaterroute.snapshot.paramMap.get('dataMyclock');
    const dM = JSON.parse(dataMyclock);
    this.myclock = dM;
    this.headclock = this.myclock.headclock; 
    console.log(this.headclock);
  }

  edit(i:number){
    this.editclock.push({"index":i,"dataMyclock":this.myclock});
    const dataMyclock = JSON.stringify(this.editclock);
    this.navCtrl.navigateForward(['crudclock',dataMyclock])
  }

  goback() {
    const dataMyclock = JSON.stringify(this.myclock);
    this.navCtrl.navigateForward(['homeii',dataMyclock]);
  }

  createMyclock(){
    this.createclock.push({"index": null,"dataMyclock":this.myclock})
    const dataMyclock = JSON.stringify(this.createclock);
    this.navCtrl.navigateForward(['crudclock',dataMyclock]);
  }

  downloadClock(){
    console.log('downloadClock is selected');
  }

  uploadClock(){
    console.log('uploadClock is selected');
  }

}
