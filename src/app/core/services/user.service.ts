import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { MOCK_USERS } from './user-mock-data';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Member';
  status: 'Active' | 'Pending' | 'Offline';
  lastActivity: string;
  avatar: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersData = [...MOCK_USERS];

  getUsers(): Observable<User[]> {
    return of([...this.usersData]).pipe(delay(350));
  }

  addUser(user: User): Observable<User> {
    this.usersData = [user, ...this.usersData];
    return of(user).pipe(delay(200));
  }

  updateUser(user: User): Observable<User> {
    let updated: User | undefined;
    this.usersData = this.usersData.map(u => {
      if (u.id === user.id) {
        updated = user;
        return updated;
      }
      return u;
    });

    if (!updated) {
      throw new Error('User not found');
    }

    return of(updated).pipe(delay(200));
  }

  deleteUser(id: string): Observable<boolean> {
    this.usersData = this.usersData.filter(u => u.id !== id);
    return of(true).pipe(delay(200));
  }
}
