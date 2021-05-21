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
  clockJS: any;
  showLoader: boolean;
  clockCard: string[];
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
    }, {
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
    ) {
      this.initializeApp();
      this.clockCard = new Array();
    }
  // LOAD DATA
  initializeApp(){
    fetch('./assets/data-bodyclock/bodyclock.json').then(res => res.json()).then(json => {
      console.log(this.myDate);
      console.log('bodyclock log', json);
      this.bodyclock = json;
    });
    fetch('./assets/data-myclock/clock.json').then(res => res.json()).then(json => {
      console.log('clock log ##', json);
      this.clockJS = json;
      this.clockCard.push(this.clockJS.dataclock[0][8]);
      this.clockCard.push(this.clockJS.dataclock[0][9]);
      this.clockCard.push(this.clockJS.dataclock[0][10]);
      console.log( 'LOG clockCard have', this.clockCard );
    });
  }

  // method for CHANGE PAGE
  gotoPage(np: string) {
    this.nextPage = np;
    this.navCtrl.navigateForward(this.nextPage);
  }
  // method for Alert TEST
  async presentAlert() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Healthy time',
      subHeader: 'V 1.1.2' ,
      message: 'This is an alert message.',
      buttons: [ {
        text: 'ok',
        handler: data => {
          console.log('Cancel clicked');
          confirm();
        }
      }]
    });

    await alert.present();
  }
  // method for Login
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

  // method for GOAL
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
  delets(i: number) {
    this.goal.splice(i, 1);
  }

  // GOAL show Point
  runDeterminateProgress() {
    this.numProgress = this.numProgress + 20;
    {
      this.setPercentBar(+this.numProgress);
    }
  }
  // GOAL set PercentBar
  setPercentBar(i: number) {
    setTimeout(() => {
      const apc = (i / 100);
      console.log(apc);
      this.p_bar_value = apc;
    }, 30 * i);
  }
  setRound(i: number) {
    this.roundbar = this.roundbar + 1;
    this.runDeterminateProgress();
    const check = this.goal[i].event;
    console.log(check);
    this.delets(i);
  }

  confirm() {

  }
}
