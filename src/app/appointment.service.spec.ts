import { TestBed, inject } from '@angular/core/testing';

import { AppointmentService } from './appointment.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

describe('AppointmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        AppointmentService,
        HttpClient,
      ]
    });
  });

  it('should be created', inject([AppointmentService], (service: AppointmentService) => {
    expect(service).toBeTruthy();
  }));

  it('should have getAllAppointment function',
  inject([AppointmentService], (service: AppointmentService) => {
    expect(service.getAllAppointment()).toBeTruthy();
  }));

  it('should have optional search param in getAllAppointment function',
  inject([AppointmentService], (service: AppointmentService) => {
    expect(service.getAllAppointment('sa')).toBeTruthy(); // Make sure it send to server
  }));
});
