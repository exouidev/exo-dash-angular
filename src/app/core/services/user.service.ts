import { Injectable, signal, computed } from '@angular/core';

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
  readonly users = signal<User[]>([
    { id: '1', name: 'Alice Freeman', email: 'alice.f@example.com', role: 'Admin', status: 'Active', lastActivity: 'Just now', avatar: 'AF' },
    { id: '2', name: 'Bob Smith', email: 'bsmith@example.com', role: 'Manager', status: 'Offline', lastActivity: '2 hours ago', avatar: 'BS' },
    { id: '3', name: 'Catherine Jenkins', email: 'cathy.j@example.com', role: 'Member', status: 'Pending', lastActivity: 'Never', avatar: 'CJ' },
    { id: '4', name: 'David Lee', email: 'david.l@example.com', role: 'Member', status: 'Active', lastActivity: '5 mins ago', avatar: 'DL' },
    { id: '5', name: 'Eva Morales', email: 'eva.m@example.com', role: 'Manager', status: 'Active', lastActivity: '1 hour ago', avatar: 'EM' },
    { id: '6', name: 'Frank Wright', email: 'frank.w@example.com', role: 'Member', status: 'Offline', lastActivity: '3 days ago', avatar: 'FW' },
    { id: '7', name: 'Grace Taylor', email: 'grace.t@example.com', role: 'Member', status: 'Active', lastActivity: '15 mins ago', avatar: 'GT' },
    { id: '8', name: 'Henry Chen', email: 'hchen8@example.com', role: 'Member', status: 'Pending', lastActivity: 'Never', avatar: 'HC' },
  ]);

  readonly activeUsersCount = computed(() => this.users().filter(u => u.status === 'Active').length);
  readonly totalUsersCount = computed(() => this.users().length);


  addUser(user: User) {
    this.users.update(list => [user, ...list]);
  }

  updateUser(user: User) {
    this.users.update(list => list.map(u => u.id === user.id ? user : u));
  }

  deleteUser(id: string) {
    this.users.update(users => users.filter(u => u.id !== id));
  }
}
