import { Component, OnInit } from '@angular/core';

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

  constructor() {}
  testPass(){
    if (this.password === this.password2) {
      if (this.password != null && this.email != null && this.username != null ){
        this.valuePass = 'รหัสผ่านถูกต้อง' ;
        this.hide();
      }else{
        this.valuePass = 'กรุณากรอกรหัสผ่านก่อนยืนยัน';
      }
    } else {
      this.valuePass = 'รหัสผ่านไม่ถูกต้อง โปรดป้อนให้เหมือนกันอีกครั้ง' ;
    }
  }
  hide() {
    this.hideMe = true;
  }

  ngOnInit() {
  }

}
