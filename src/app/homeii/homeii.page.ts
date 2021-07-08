import { Component, OnInit } from '@angular/core';
import { AlertController, IonSlides, NavController, ToastController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ActivatedRoute } from '@angular/router';
//import { HTTP } from '@ionic-native/http/ngx';

interface Goal {
  round: number
  event: string
}

@Component({
  selector: 'app-homeii',
  templateUrl: './homeii.page.html',
  styleUrls: ['./homeii.page.scss'],
})
export class HomeiiPage implements OnInit {

  urlLink: string[] = ['history', 'event', 'myclock', 'crudclock', 'signup', 'login'];
  // BODY CLOCK
  bodyclock: any;
  slideOptions = {
    initialSlide: 0,
    slidesPerView: 1,
    speed: 600,
  };
  // MY CLOCK
  selectClock = 0;
  myclock: any;
  headclock: any;
  clockCard = new Array();
  card: number;


  myDate = new Date();
  date: any = new Date().toISOString();
  
  // GOAL
  goalDone: Goal[];
  goal: Goal[] = [
    {
      round : 1,
      event : 'อ่านหนังสือ 10 นาที'
    }, {
      round : 1,
      event : 'พักสายตาจากจอ 20 นาที'
    }, {
      round : 8,
      event : 'ดื่มน้ำ'
    }, {
      round : 1,
      event : 'ออกกำลังกาย 30 นาที'
    }, {
      round : 2,
      event : 'ทานผักหรือผลไม้'
    },
  ];
  roundbar: number;
  showLoader: boolean;
  numProgress = 0;
  // tslint:disable-next-line: variable-name
  p_bar_value: number;

  //EVENT
  event: any;
  count_event: number;
  history:any;
  dataMember: any;

  constructor(
    public navCtrl: NavController,
    public toastController: ToastController,
    public alertCtrl: AlertController,
    public statusBar: StatusBar,
    private activaterroute: ActivatedRoute
    ) {
      this.initializeApp();
    }
  ngOnInit() {
      const dataMember = this.activaterroute.snapshot.paramMap.get('dMember');
      const mem = JSON.parse(dataMember);
      this.dataMember = mem;
      console.log('ข้อมูลสมาชิก',this.dataMember);

      const dataclock = this.activaterroute.snapshot.paramMap.get('dataMyclock');
      const dc = JSON.parse(dataclock);
      this.myclock = dc;
  }
  // LOAD DATA
  initializeApp(){
    fetch('./assets/data-myevent/myevent.json').then(res => res.json()).then(json => {
      this.history = json;
      this.event = json;
      console.log( 'myhis : ',this.history)
      this.countEvent();
    });
    fetch('./assets/data-bodyclock/bodyclock.json').then(res => res.json()).then(json => {
      this.bodyclock = json;
    });
    fetch('./assets/data-myclock/myclock.json').then(res => res.json()).then(json => {
      this.myclock = json;
      this.headclock = this.myclock.headclock;
      console.log( 'myclock : ',this.myclock)
      this.setClock(this.selectClock);
      console.log( 'myclock.dataclock.clockCard : ', this.clockCard );
      
    });
  }

  // method set CARD CLOCK
  setClock(i:number){
    // if else switch case for MYCLOCK CARD CURRENT
    if ((this.myDate.getHours() % 2) === 0) {
      this.card = (this.myDate.getHours() / 2);
    } else {
      this.card = ((this.myDate.getHours() - 1 ) / 2);
    }
    this.slideOptions = {
      initialSlide: this.card,
      slidesPerView: 1,
      speed: 600,
    };
    for (let index = 0; index < 3; index++) {
      if (this.card + index > 11 ) {
        this.clockCard.push(this.myclock.dataclock[i][this.card - index - 8 ]);
      } else {
        this.clockCard.push(this.myclock.dataclock[i][this.card + index]);
      }
    }
  }

  // method change CARD CLOCK
  changeClock(i:number){
    this.clockCard = new Array();
    if ((this.myDate.getHours() % 2) === 0) {
      this.card = (this.myDate.getHours() / 2);
    } else {
      this.card = ((this.myDate.getHours() - 1 ) / 2);
    }
    for (let index = 0; index < 3; index++) {
      if (this.card + index > 11 ) {
        this.clockCard[index] = this.myclock.dataclock[i][this.card - index - 8 ];
      } else {
        this.clockCard[index] = this.myclock.dataclock[i][this.card + index];
      }
    }
  }

  // metthod for set MY CLOCK CARD
  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }

  // method for CHANGE PAGE
  gotoPage(np: string) {
    const nextPage = np;
    switch (nextPage) {
      case this.urlLink[1]: //event
        const dataEvent = JSON.stringify(this.event.myevent);
        this.navCtrl.navigateForward([nextPage,dataEvent]);
        break;
      case this.urlLink[0]: //history
        console.log('history have',this.history.myevent);
        const dataHistory = JSON.stringify(this.event.myevent);
        this.navCtrl.navigateForward([nextPage,dataHistory]);
        break;
      case this.urlLink[2]: //myclock
        const dataclock = JSON.stringify(this.myclock);
        this.navCtrl.navigateForward([nextPage,dataclock]);
        break;
      default:
        break;
    }
  }

  // method for countEvent
  countEvent(){
    this.count_event = 0;
    for (let i = 0; i < this.event.myevent.length; i++) {
      console.log(this.event.myevent[i][2].status);
        if (this.event.myevent[i][2].status != true) {
            this.count_event = this.count_event+1
      }
    }
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
          handler: () => {console.log();}
        }
      ]
    });
    toast.present();
  }
  delets(i: number) {
    this.goal.splice(i, 1);
  }

  // medthod GOAL
  async editGoal(i) {
    const prompt = await this.alertCtrl.create({
      header: 'แก้ไขกิจกรรมที่ส่งเสริมสุชภาพ',
      message: 'กรอกชื่อกิจกรรมและจำนวนรอบที่ต้องการ',
      inputs: [
        {
          name: 'i_event',
          type: 'text',
          value: this.goal[i].event,
          placeholder: 'กิจกรรมที่ส่งเสริมสุชภาพ เช่น ออกกำลังกาย',
        },
        { 
          name: 'i_round',
          type: 'number',
          value: this.goal[i].round,
          placeholder: 'ค่าเริ่มต้นของระบบคือ 1 รอบ',
        }
      ],
      buttons: [
        {
          text: 'ยกเลิก',
          handler: data => {console.log('edit_Cancel');}
        },
        {
          text: 'บันทึก',
          handler: data => {
            if (data.i_round != "" && data.i_event != "") {
              this.goal[i].round = data.i_round;
              this.goal[i].event = data.i_event;
            } else {
              if (data.i_round != ""){
              } else{
                this.goal[i].round = 1;
              }
            }
            console.log(data);
            console.log('ข้อมูลกิจกรรม:' + data.i_event + ' จำนวน:' + data.i_round);
          }
        }
      ]
    });
    await prompt.present();

  }
  runDeterminateProgress() {
    this.numProgress = this.numProgress + 20;
    { setTimeout(() => {
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
  resetGoal() {
    this.numProgress = 0;
    // if (this.myDate.getHours() == 0) {
    //   for (let i = 0; i < 5; i++) {
    //     this.goal[i].status = false;
    //   }this.numProgress = 0;
    // }
  }
  async createEvent(){
    const prompt = await this.alertCtrl.create({
      header: 'เพิ่มกิจกรรมที่ต้องทำ',
      message: 'กรอกข้อมูลกิจกรรมที่ต้องการ',
      inputs: [
        {
          name: 'event',
          type: 'text',
          placeholder: 'หัวเรื่อง เช่น ออกกำลังกาย',
        },
        {
          name: 'time',
          type: 'time',
        },
      ],
      buttons: [
        {
          text: 'ยกเลิก',
          handler: data => {
            console.log('Create_Cancel');
          }
        },
        {
          text: 'บันทึก',
          handler: data => {
            this.event.push([{'name': data.event},{'time':data.time},{'status':false}]);
            this.countEvent();
          }
        }
      ]
    });
    await prompt.present();
  }

}
