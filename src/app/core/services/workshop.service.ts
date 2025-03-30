import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Workshop } from '../interfaces/workshop';
import { CustomHttpResponse } from 'src/app/interface/custom-http-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkshopService {

  private readonly baseUrl : string  = environment.apiUrl;

  constructor(private http : HttpClient) { }


getAllWorkshops$(): Observable<Workshop[]> {
  return this.http.get<CustomHttpResponse<{workshop : Workshop[]}>>(`${this.baseUrl}/workshop/all`).pipe(
    map(response => response.data?.workshop),
    tap(response => console.log('API Response:', response))
  );
}


}
