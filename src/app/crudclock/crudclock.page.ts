import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crudclock',
  templateUrl: './crudclock.page.html',
  styleUrls: ['./crudclock.page.scss'],
})
export class CrudclockPage implements OnInit {
  clock: any;
  name: string;
  color: string;
  time = ['00:00-03:00', '03:00-05:00', '05:00-07:00', '07:00-09:00', '09:00-11:00', '11:00-13:00', '13:00-15:00',
          '15:00-17:00', '17:00-19:00', '19:00-21:00', '21:00-23:00', '23:00-00:00'];
  default = [];

  constructor() {}

  ngOnInit() {}

}
