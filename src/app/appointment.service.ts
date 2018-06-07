import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Time } from '@angular/common';

export interface Appointment {
  date: Date;
  time: Time;
  description: string;
}

@Injectable()
export class AppointmentService {

  constructor(public http: HttpClient) { }

  getAllAppointment(text?: string): Observable<Appointment[]> {
    if (text) {
      return this.http.get<Appointment[]>(`/api/search/${text}`);
    }
    return this.http.get<Appointment[]>(`/api`);
  }

  insertAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(`/api/new`, appointment);
  }

}
