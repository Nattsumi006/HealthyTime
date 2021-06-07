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
            // this.his[i].title = data.name1;
            console.log('ข้อมูลถูกแก้ไข : ' + data.name1);
          }
        }
      ]
    });
    await prompt.present();

  }

  delets(i) {
    // this.his.splice(i, 1);
  }

  ngOnInit() {
  }

}
