import { Component, OnInit } from '@angular/core';
import { AppointmentService, Appointment } from '../appointment.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  isFormVisible:boolean = false;
  isListVisible:boolean = false;
  list: Appointment[];
  searchText: string;


  constructor(private service: AppointmentService) { }

  ngOnInit() {
    this.getAppointments();
  }

  onToggle():void {
    if(this.isFormVisible) this.isFormVisible = false;
    else this.isFormVisible = true;
  }

  getAppointments(search?:string): void {
      this.service.getAllAppointment(search).subscribe((data:Appointment[]) => {
        this.isListVisible = data.length > 0 ? true : false;
        this.list = data
      });
  }
}
