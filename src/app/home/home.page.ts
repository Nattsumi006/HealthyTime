import { Component } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { File } from '@ionic-native/file/ngx';

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
  urlLink: string[] = ['history', 'event', 'myclock', 'crudclock', 'signup'];
  nextPage: string;
  showLoader: boolean;
  numProgress = 0;
  // tslint:disable-next-line: variable-name
  p_bar_value: number;
  selectClock = 0;
  bodyclock: any;
  myclock: any;
  clockCard: string[];
  card: number;
  myDate = new Date();
  date: any = new Date().toISOString();
  roundbar: number;

  // GOAL
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
    }, {
      round : 1,
      event : 'ออกกำลังกาย 30 นาที'
    },
  ];

  constructor(
    public navCtrl: NavController,
    public toastController: ToastController,
    public alertCtrl: AlertController,
    public statusBar: StatusBar,
    private file: File
    ) {
      this.initializeApp();
      this.clockCard = new Array();
    }

  // LOAD DATA
  initializeApp(){
    fetch('./assets/data-bodyclock/bodyclock.json').then(res => res.json()).then(json => {
      console.log('bodyclock log', json);
      this.bodyclock = json;
    });
    fetch('./assets/data-myclock/clock.json').then(res => res.json()).then(json => {
      console.log('myclock log', json);
      console.log( 'myclock.dataclock.clockCard LIVE', this.clockCard );
      this.myclock = json;
      // if else switch case for MYCLOCK CARD CURRENT
      if ((this.myDate.getHours() % 2) === 0) {
        this.card = (this.myDate.getHours() / 2);
      } else {
        this.card = ((this.myDate.getHours() - 1 ) / 2);
      }
      switch (this.card) {
        case 0: this.card = 0;
                break;
        case 1: this.card = 1;
                break;
        case 2: this.card = 2;
                break;
        case 3: this.card = 3;
                break;
        case 4: this.card = 4;
                break;
        case 5: this.card = 5;
                break;
        case 6: this.card = 6;
                break;
        case 7: this.card = 7;
                break;
        case 8: this.card = 8;
                break;
        case 9: this.card = 9;
                break;
        case 10: this.card = 10;
                 break;
        case 11: this.card = 11;
                 break;
        case 12: this.card = 12;
                 break;
        default:
            console.log('Something wrong!');
            break;
      }
      this.clockCard.push(this.myclock.dataclock[this.selectClock][this.card]);
      this.clockCard.push(this.myclock.dataclock[this.selectClock][this.card + 1]);
      this.clockCard.push(this.myclock.dataclock[this.selectClock][this.card + 2]);
      console.log(this.date);
    });
  }
  // metthod for set MY CLOCK CARD

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
        // tslint:disable-next-line: variable-name
        handler: _data => {
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
          handler: _data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Login',
          handler: _data => {
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
      setTimeout(() => {
        const apc = (this.numProgress / 100);
        console.log(apc);
        this.p_bar_value = apc;
      }, 30 * this.numProgress);
    }
  }

  setRound(i: number) {
    this.roundbar = this.roundbar + 1;
    this.runDeterminateProgress();
    const check = this.goal[i].event;
    console.log(check);
    this.delets(i);
  }

  confirm() {
    this.file.removeFile(this.file.dataDirectory, './assets/data-myevent/myevent.json');
    // tslint:disable-next-line: max-line-length
    // this.file.writeFile(this.file.dataDirectory, './assets/data-myevent/myevent.json', 'hello,world', {replace: true}).then(_ => console.log('Directory exists')).catch(err => console.log('Directory doesn\'t exist'));
  }
}
