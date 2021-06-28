import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  history: any;
  constructor(
    public navCtrl: NavController , 
    public alertCtrl: AlertController,
    private activaterroute: ActivatedRoute) {}

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
            this.history[i].title = data.name1;
            console.log('ข้อมูลถูกแก้ไข : ' + data.name1);
          }
        }
      ]
    });
    await prompt.present();

  }

  delets(i) {
    this.history.splice(i, 1);
  }

  ngOnInit() {
      const dataRecv = this.activaterroute.snapshot.paramMap.get('dataHistory');
      const obj = JSON.parse(dataRecv);
      this.history = obj;
      console.log(this.history.length);
      for (let index = 0; index < this.history.length; index++) {
        if (this.history[index].status != true) {
          this.delets(index);
        }
      }
  }
}



