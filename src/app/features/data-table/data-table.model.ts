export interface UserRecord {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  status: 'Active' | 'Offline' | 'Banned';
  lastActive: string;
}
