import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  map,
  Observable,
  tap,
  catchError,
  throwError,
  filter,
  take,
} from 'rxjs';
import { Workshop } from 'src/app/modules/workshop/interfaces/workshop';
import { CustomHttpResponse } from 'src/app/interface/custom-http-response';
import { environment } from 'src/environments/environment';
import { NewWorkshopModalComponent } from './components/new-workshop-modal/new-workshop-modal.component';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectAllWorkshops } from './store/workshop.selectors';
import {
  AddNewWorkshopAction,
  EditWorkshopAction,
} from './store/workshop.actions';

@Injectable({
  providedIn: 'root',
})
export class WorkshopService implements OnInit {
  private readonly baseUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private modal: NgbModal,
    private store: Store
  ) {}

  ngOnInit(): void {}

  // service methods for dispatch actions

  addNewWorkshopService(newWorkshop: Workshop) {
    this.store.dispatch(AddNewWorkshopAction.start({ newWorkshop }));
  }

  editWorkshopService(id: number, editedWorkshop: Workshop) {
  
    this.store
      .select(selectAllWorkshops)
      .pipe(
        map((wsList) => wsList.find((ws) => ws.id === id)),
        take(1)
      )
      .subscribe((originalWorkshop) => {
        if (!originalWorkshop) return;

        const updatedWorkshop: Workshop = {
          ...originalWorkshop,
          ...editedWorkshop,
        };
        this.store.dispatch(
          EditWorkshopAction.start({ workshop: updatedWorkshop })
        );
      });
  }

  //----------------------------------------HttpClient actions

  getAllWorkshops$(): Observable<
    CustomHttpResponse<{ workshops: Workshop[] }>
  > {
    return this.http
      .get<CustomHttpResponse<{ workshops: Workshop[] }>>(
        `${this.baseUrl}/workshop/all`
      )
      .pipe(tap((response) => console.log('API Response', response)));
  }

  addNewWorkshop$(
    workshop: Workshop
  ): Observable<CustomHttpResponse<{ workshop: Workshop }>> {
    return this.http
      .post<CustomHttpResponse<{ workshop: Workshop }>>(
        `${this.baseUrl}/workshop/newWorkshop`,
        workshop
      )
      .pipe(catchError(this.handleError));
  }

  deleteWorkshop$(id: number): Observable<CustomHttpResponse<null>> {
    console.log('SERVICE deleteWorkshop$, id primit:', id);
    return this.http
      .delete<CustomHttpResponse<null>>(
        `${this.baseUrl}/workshop/deleteWorkshop/${id}`
      )
      .pipe(catchError(this.handleError));
  }

  editWorkshop$(
    workshop: Workshop
  ): Observable<CustomHttpResponse<{ workshop: Workshop }>> {
    return this.http
      .post<CustomHttpResponse<{ workshop: Workshop }>>(
        `${this.baseUrl}/workshop/editWorkshop`,
        workshop
      )
      .pipe(catchError(this.handleError));
  }

  //-------------------------------------------------------------------------------------------Error hanlde

  private handleError(error: HttpErrorResponse) {
    let errorMessage: string;

    if (error.error) {
      if (error.error instanceof ErrorEvent) {
        errorMessage = error.error.message;
      } else {
        if (error.error.reason) {
          errorMessage = error.error.reason;
        } else {
          errorMessage = `en error occured - error status ${error.status} - error message ${error.message}`;
        }
      }
    } else {
      errorMessage = `en error occured - error status ${error.status} - error message ${error.message}`;
    }
    return throwError(() => errorMessage);
  }

  //---------------------------------------------------------------------------------------Modal options

  openNewWorkshopModal(workshop?: Workshop) {
    const modalRef = this.modal.open(NewWorkshopModalComponent, { size: 'md' });

    if (workshop) {
      modalRef.componentInstance.workshopx = workshop;
    }
  }

  closeModal() {
    this.modal.dismissAll();
  }
}
