import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {

  event: any ;
  date: any = new Date().toISOString();

  constructor(public navCtrl: NavController , public alertCtrl: AlertController) { this.initializeApp(); }

  initializeApp(){
    fetch('./assets/data-myevent/myevent.json').then(res => res.json()).then(json => {

      this.event = json;
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.event.length; i++) {
        this.check();
      }

      console.log(this.event);
    });
  }

  goback() {
    this.navCtrl.pop();
  }
  check(){
    for (let i = 0; i < this.event.length; i++) {
      if (this.event[i][2].status === true) {
        this.del(i);
     } else {
     }
    }
  }
  async edit(i) {
    const prompt = await this.alertCtrl.create({
      header: 'แก้ไขหัวเรื่อง',
      message: 'ป้อนหัวเรื่องลักษณะข้อความที่ต้องการ',
      inputs: [
        {
          cssClass: 'my-custom-class',
          name: 'name',
          type: 'text',
          placeholder: 'หัวเรื่อง เช่น ออกกำลังกาย',
        },
      ],
      buttons: [
        {
          text: 'ยกเลิก',
          handler: data => {
            console.log('edit_Cancel');
          }
        },
        {
          text: 'บันทึก',
          handler: data => {
            this.event[i][0].name = data.name;
            console.log('ข้อมูลถูกแก้ไข : ' + data.name);
          }
        }
      ]
    });
    await prompt.present();

  }

  del(i) {
    console.log('delete' + this.event[i][0].name);
    this.event.splice(i, 1);
  }

  ngOnInit() {
  }

}
