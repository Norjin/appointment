import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppointmentService, Appointment } from '../appointment.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms/src/model';
import { validateConfig } from '@angular/router/src/config';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  newForm: FormGroup;
  today: string;
  @Output() cancel = new EventEmitter<boolean>();
  @Output() newItem = new EventEmitter<Appointment>();

  constructor(
    private formBuilder: FormBuilder,
    private service: AppointmentService
  ) {
    this.newForm = formBuilder.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      description: ['', Validators.required]
    });
   }

  ngOnInit() {
    const date = new Date();
    const mn = date.getMonth() + 1;
    const month = mn < 10 ? '0' + mn : mn;
    // this.today = date.getFullYear() + '-' + month + '-' + date.getDate();
    this.today = new Date().toJSON().split('T')[0];
  }

  onCancel(): void {
    this.cancel.emit(true);
  }

  onSubmit(): void {
    const record = this.newForm.value;
    this.service.insertAppointment(record).subscribe(data => {
      this.newItem.emit(data);
      this.onCancel();
    });
  }

}
