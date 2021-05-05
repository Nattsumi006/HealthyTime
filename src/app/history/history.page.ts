import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  his = [
    {
      title: 'ประชุมโครงการ เรื่องการเลือกฐานข้อมูล',
      time: '18:00',
    },
    {
      title: 'นัดทานข้าวกับลุงพล',
      time: '17:00',
    },
    {
      title: 'ประชุมโครงการ แก้ไข หน้าแสดงผล',
      time: '15:00',
    },
    {
      title: 'นัดออกกำลังกายกับดอล่า',
      time: '10:00',
    },
    {
      title: 'ซื้อของเตรียมปาร์ตี้',
      time: '09:00',
    },
  ];

  mhis = [
    {
      title: 'ประชุมกิจกรรม "น้องใหม่สาขา" ทุกชั้นปี',
      time: '17:00',
    },
    {
      title: 'ประชุมกิจกรรม "แนะนำรุ่นน้อง"',
      time: '13:00',
    },
  ];

  constructor(public navCtrl: NavController , public alertCtrl: AlertController) { }
  goback() {
    this.navCtrl.pop();
  }
  async edit(i) {
    const prompt = await this.alertCtrl.create({
      header: 'แก้ไขหัวเรื่อง',
      message: 'ป้อนหัวเรื่องลักษณะข้อความที่ต้องการ',
      inputs: [
        {
          cssClass: 'my-custom-class',
          name: 'name1',
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
            this.his[i].title = data.name1;
            console.log('ข้อมูลถูกแก้ไข : ' + data.name1);
          }
        }
      ]
    });
    await prompt.present();

  }

  delets(i) {
    this.his.splice(i, 1);
  }

  ngOnInit() {
  }

}
