import { Injectable } from '@angular/core';
import { Technician } from './models/technician';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CustomHttpResponse } from 'src/app/interface/custom-http-response';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTechnicianComponent } from './components/add-technician/add-technician.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TechnicianService {

 
  private readonly server: string = environment.apiUrl;

  constructor(private http : HttpClient,  private modal : NgbModal) { }

    getTechnicians$(): Observable<CustomHttpResponse<{ technicians: Technician[] }>> {
      return this.http.get<CustomHttpResponse<{ technicians: Technician[] }>>(`${this.server}/all`).pipe(
        tap(response => console.log('API Response:', response)),
        catchError(this.handleError)
      );
    }


  addTechnician$(technician: Technician): Observable<CustomHttpResponse<Technician>> {
    return this.http.post<CustomHttpResponse<Technician>>(`${this.server}/newTechnician`, technician).pipe(
      tap(response => console.log('API Response:', response)),
      catchError(this.handleError)
    )
  }


    private handleError(error: HttpErrorResponse) {
      let errorMessage: string;

      if(error.error){
      if (error.error instanceof ErrorEvent) {
        errorMessage = error.error.message;
      } else {
        if (error.error.reason) {
          errorMessage = error.error.reason;
        } else {
          errorMessage = `en error occured - error status ${error.status} - error message ${error.message}`;
        }
      }}else{
        errorMessage = `en error occured - error status ${error.status} - error message ${error.message}`;
      }
      return throwError(() => errorMessage);
    }


    addNewTechModal(){
      this.modal.open(AddTechnicianComponent, {size : 'lg'});

    }



  }