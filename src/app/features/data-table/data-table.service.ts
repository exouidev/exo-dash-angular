import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { UserRecord } from './data-table.model';
import { MOCK_USER_RECORDS } from './data-table-mock-data';

@Injectable({
  providedIn: 'root'
})
export class DataTableService {
  private data = [...MOCK_USER_RECORDS];

  getUsers(): Observable<UserRecord[]> {
    return of([...this.data]).pipe(delay(300));
  }

  updateUser(id: string, updates: Partial<UserRecord>): Observable<UserRecord> {
    let updatedUser: UserRecord | undefined;
    this.data = this.data.map(u => {
      if (u.id === id) {
        updatedUser = { ...u, ...updates } as UserRecord;
        return updatedUser;
      }
      return u;
    });

    if (!updatedUser) throw new Error('User not found');
    return of(updatedUser).pipe(delay(150));
  }

  deleteUser(id: string): Observable<boolean> {
    this.data = this.data.filter(u => u.id !== id);
    return of(true).pipe(delay(150));
  }
}
