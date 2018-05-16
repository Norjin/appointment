import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Time } from '@angular/common';

export interface Appointment {
  date: Date;
  time: Time;
  description: string;
}

let url = 'http://localhost:8000';

@Injectable()
export class AppointmentService {

  constructor(public http: HttpClient) { }

  getAllAppointment(text?: string): Observable<Appointment[]> {
    if(text) return this.http.get<Appointment[]>(`${url}/api/search/${text}`);
    return this.http.get<Appointment[]>(`${url}/api`);
  }

  insertAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(`${url}/api/new`, appointment);
  }

}
