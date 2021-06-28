import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {

  event: any ;
  date: any = new Date().toISOString();

  constructor(
    public navCtrl: NavController , 
    public alertCtrl: AlertController,
    private activaterroute: ActivatedRoute) {}

  ngOnInit() {
      const dataRecv = this.activaterroute.snapshot.paramMap.get('dataEvent');
      const obj = JSON.parse(dataRecv);
      this.event = obj;
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.event.length; i++) {
        this.check();
      }
  }

  goback() {
    this.navCtrl.pop();
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
          }
        }
      ]
    });
    await prompt.present();
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

  

}
