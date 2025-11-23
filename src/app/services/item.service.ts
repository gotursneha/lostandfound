import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface ItemReport {
  id?: string;
  type: 'lost' | 'found';
  itemName: string;
  category: string;
  description: string;
  date: string;
  location: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  imageUrl?: string;
  status?: 'active' | 'resolved';
  createdAt?: string;
  resolvedAt?: string;
  matchedWith?: {
    id: string;
    type: 'lost' | 'found';
    itemName: string;
    contactName: string;
    contactEmail: string;
  };
}

export interface ItemResponse {
  success: boolean;
  message: string;
  item?: ItemReport;
}

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private readonly API_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  reportLostItem(item: ItemReport): Observable<ItemResponse> {
    return this.http.post<ItemResponse>(`${this.API_URL}/items/lost`, item).pipe(
      catchError(this.handleError)
    );
  }

  reportFoundItem(item: ItemReport): Observable<ItemResponse> {
    return this.http.post<ItemResponse>(`${this.API_URL}/items/found`, item).pipe(
      catchError(this.handleError)
    );
  }

  getLostItems(): Observable<{ success: boolean; items: ItemReport[] }> {
    return this.http.get<{ success: boolean; items: ItemReport[] }>(`${this.API_URL}/items/lost`).pipe(
      catchError(this.handleError)
    );
  }

  getFoundItems(): Observable<{ success: boolean; items: ItemReport[] }> {
    return this.http.get<{ success: boolean; items: ItemReport[] }>(`${this.API_URL}/items/found`).pipe(
      catchError(this.handleError)
    );
  }

  reuniteItems(lostItemId: string, foundItemId: string): Observable<{ success: boolean; message: string }> {
    return this.http.put<{ success: boolean; message: string }>(`${this.API_URL}/items/reunite`, {
      lostItemId,
      foundItemId
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = error.error?.message || error.message;
    }
    
    console.error('API Error:', errorMessage);
    return throwError(() => ({ success: false, message: errorMessage }));
  }
}
