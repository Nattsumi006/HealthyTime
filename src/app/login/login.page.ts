import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email : String;
  password : String;
  status: String;
  member: any;
  dataMember = new Array();;

  constructor(
    public navCtrl: NavController,
    public toastController: ToastController,
    private activaterroute: ActivatedRoute) {}

  ngOnInit() {
    const dataMember = this.activaterroute.snapshot.paramMap.get('dataMember');
    const mem = JSON.parse(dataMember);

    this.member = mem;
    console.log('จำนวนสมาชิก',this.member.member.length)
  }

  async login_fail() {
    const toast = await this.toastController.create({
      header: 'ข้อมูลไม่ถูกต้อง',
      message: 'เนื่องจากอีเมลของท่านยังไม่ลงทะเบียนหรือรหัสผ่านไม่ถูกต้อง',
      position: 'bottom',
      buttons: [
        {
          side: 'end',
          icon: 'checkmark-sharp',
          handler: () => {console.log('ลองอีกครั้ง');}
        }
      ]
    });
    toast.present();
  }

  login(){
    for (let index = 0; index < this.member.member.length; index++) {
      if (this.email == this.member.member[index][2].email) {
        if (this.password == this.member.member[index][3].password) {
          this.dataMember.push({"member_id":this.member.member[index][0].member_id},{"username":this.member.member[index][1].username});
          const dMember = JSON.stringify(this.dataMember);
          this.navCtrl.navigateForward(['homeii',dMember]);
        } else {
          this.login_fail();
          break;
        }
      }
    }    
  }
  reg(){
    const Member = JSON.stringify(this.member);
    this.navCtrl.navigateForward(['signup',Member]);
  }

}
