import { Component } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';

interface Goal {
  round: number;
  event: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  urlLink: string[] = ['history', 'event', 'myclock' , 'crudclock' ];
  nextPage: string;

  bodyclock: any;
  myclock: any;
  showLoader: boolean;
  numProgress = 0;
  // tslint:disable-next-line: variable-name
  p_bar_value: number;
  myDate: string = new Date().toISOString();
  // เป้าหมายของผู้ใช้งาน
  goalDone: Goal[];
  goal: Goal[] = [
    {
      round : 1,
      event : 'ทานมื้อเช้า'
    },{
      round : 1,
      event : 'พักสายตา 10 นาที'
    }, {
      round : 8,
      event : 'ดื่มน้ำ'
    }, {
      round : 1,
      event : 'ออกกำลังกาย 30 นาที'
    },
  ];
  roundbar: number;

  constructor(
    public navCtrl: NavController,
    public toastController: ToastController,
    public alertCtrl: AlertController,
    public statusBar: StatusBar,
    ) {this.initializeApp(); }

  initializeApp(){
    this.statusBar.styleDefault();
    fetch('./assets/data-bodyclock/bodyclock.json').then(res => res.json()).then(json => {
      console.log('bodyclock log ##', json);

      console.log(this.myDate);
      console.log('index card-bodyclock : 5');

      this.bodyclock = json;
    });
    fetch('./assets/data-myclock/default-clock.json').then(res => res.json()).then(json => {
      console.log('connect');
      console.log('myclock log ##', json);

      console.log(this.myDate);
      console.log('index card-myclock : 6');

      this.myclock = json;
    });


    const arr = [12];
    // tslint:disable-next-line: forin
    for (const index in arr) {
      console.log(index);
      console.log(arr[index]);
    }
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Healthy time',
      subHeader: 'V 1.1.2' ,
      message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async loginPrompt() {
    const alert = await this.alertCtrl.create({
      header: 'Login',
      inputs: [
        {
          name: 'username',
          placeholder: 'Username'
        },
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Login',
          handler: data => {
            console.log();
          }
        }
      ]
    });
    alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      header: 'เพิ่มคะแนนให้กับคุณกับภารกิจในวันนี้',
      message: 'ออกกำลังกาย 30 นาที',
      position: 'top',
      buttons: [
        {
          side: 'end',
          icon: 'close-outline',
          text: 'ข้าม',
          handler: () => {console.log(this.myDate + 'cancel'); }
        },
        {
          side: 'end',
          icon: 'checkmark-sharp',
          text: 'สำเร็จ',
          handler: () => {console.log('+20 clicked'); this.runDeterminateProgress(); }
        }
      ]
    });
    toast.present();
  }

  gotoPage(np: string) {
    this.nextPage = np;
    this.navCtrl.navigateForward(this.nextPage);
  }

  runDeterminateProgress() {
    this.numProgress = this.numProgress + 20;
    {
      this.setPercentBar(+this.numProgress);
    }
  }

  setRound(i) {
    this.roundbar = this.roundbar + 1;
    this.runDeterminateProgress();
    const check = this.goal[i].event;
    console.log(check);
    this.delets(i);

  }

  setPercentBar(i) {
    setTimeout(() => {
      const apc = (i / 100);
      console.log(apc);
      this.p_bar_value = apc;
    }, 30 * i);
  }

  delets(i) {
    this.goal.splice(i, 1);
  }
}
