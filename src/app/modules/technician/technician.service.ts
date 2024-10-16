import { Injectable } from '@angular/core';
import { Technician } from './models/technician';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TechnicianService {

  constructor() { }


  getTechnicians() : Observable<Technician[]> {
    return new Observable<Technician[]>(
      (observer) => {
        observer.next([
          {
            id: 1,
            isActive: true,
            workshop: 'workshop',
            technicianExperience: 1,
            techicianSpecialization: 'specialization'
          }
        ])
      }

    )}
  
  }