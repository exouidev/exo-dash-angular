import { User } from './user.service';

export const MOCK_USERS: User[] = [
  { id: '1', name: 'Alice Freeman', email: 'alice.f@example.com', role: 'Admin', status: 'Active', lastActivity: 'Just now', avatar: 'AF' },
  { id: '2', name: 'Bob Smith', email: 'bsmith@example.com', role: 'Manager', status: 'Offline', lastActivity: '2 hours ago', avatar: 'BS' },
  { id: '3', name: 'Catherine Jenkins', email: 'cathy.j@example.com', role: 'Member', status: 'Pending', lastActivity: 'Never', avatar: 'CJ' },
  { id: '4', name: 'David Lee', email: 'david.l@example.com', role: 'Member', status: 'Active', lastActivity: '5 mins ago', avatar: 'DL' },
  { id: '5', name: 'Eva Morales', email: 'eva.m@example.com', role: 'Manager', status: 'Active', lastActivity: '1 hour ago', avatar: 'EM' },
  { id: '6', name: 'Frank Wright', email: 'frank.w@example.com', role: 'Member', status: 'Offline', lastActivity: '3 days ago', avatar: 'FW' },
  { id: '7', name: 'Grace Taylor', email: 'grace.t@example.com', role: 'Member', status: 'Active', lastActivity: '15 mins ago', avatar: 'GT' },
  { id: '8', name: 'Henry Chen', email: 'hchen8@example.com', role: 'Member', status: 'Pending', lastActivity: 'Never', avatar: 'HC' },
];
