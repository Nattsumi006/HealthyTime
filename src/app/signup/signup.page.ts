import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  hideMe: boolean;
  email: string;
  username: string;
  password: string;
  password2: string;
  valuePass: string;
  dateC: any = new Date();
  date: string = this.dateC.getHours() + ':' + this.dateC.getMinutes() ;
  dataMember: any;
  count: number;

  constructor(
    public navCtrl: NavController,
    public toastController: ToastController,
    public loadingController: LoadingController,
    private activaterroute: ActivatedRoute) {}

  async createMember() {
      const loading = await this.loadingController.create({
        message: 'กำลังดำเนินการ',
        duration: 1000,
      });
      await loading.present();
      const { role } = await loading.onDidDismiss();
      console.log('Loading data:', role);
      this.register();
  }
  async errEmail(){
    const toast = await this.toastController.create({
      header: 'พบข้อมูลอีเมลซ้ำกรุณาใช้อีเมลใหม่',
      position: 'middle',
      duration: 3000,
    })
    toast.present();
  }

  async register() {
    this.count = 0;
    const toast = await this.toastController.create({
      header: 'การลงทะเบียนสำเร็จ',
      message: 'ชื่อผู้ใช้งาน : ' + this.username +'\n อีเมลในการเข้าสู่ระบบ : '+this.email,
      position: 'bottom',
      duration: 3000,
      buttons: [{
          side: 'end',
          icon: 'close-outline',
          handler: () => {console.log('ชื่อผู้ใช้งาน : ' + this.username +'\n อีเมลในการเข้าสู่ระบบ : '+ this.email)}
      }]
    });
    console.log('จำนวนสมาชิก DB :',this.dataMember.member.length);

    for (let index = 0; index < this.dataMember.member.length; index++) {
      if (this.email != this.dataMember.member[index][2].email) {
        this.count = this.count+1 ;
      } else{this.count = this.count-1 ;}
    }
    if (this.count == this.dataMember.member.length) {
      toast.present();
      this.dataMember.member.push([{"member_id":this.dataMember.member[this.dataMember.member.length-1][0].member_id+1}
      ,{"username":this.username},{"email":this.email},{"password":this.password},{"score":0}]);
      const dataMember = JSON.stringify(this.dataMember);
      this.navCtrl.navigateForward(['login',dataMember]);
    } else{
      this.errEmail();
    }
    
  }

  testPass(){
    if (this.password === this.password2) {
      if (this.password != null && this.email != null && this.username != null ){
        this.valuePass = 'รหัสผ่านถูกต้อง' ;
        this.hide();
      }else{
        this.valuePass = 'กรุณากรอกข้อมูลก่อนตรวจสอบ';
      }
    } else {
      this.valuePass = 'รหัสผ่านไม่ถูกต้อง โปรดป้อนให้เหมือนกันอีกครั้ง' ;
    }
  }
  hide() {
    this.hideMe = true;
  }

  ngOnInit() {
    const dataMember = this.activaterroute.snapshot.paramMap.get('Member');
    const mem = JSON.parse(dataMember);
    this.dataMember = mem;
    console.log(this.dataMember);
  }

}
