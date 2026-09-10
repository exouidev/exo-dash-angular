import { Injectable, signal } from '@angular/core';

export interface KPI {
  id: string;
  label: string;
  value: string;
  trend: number;
  icon: string;
}

export interface ActivityData {
  time: string;
  revenue: number;
  users: number;
}

export interface CategoryData {
  name: string;
  value: number;
  color: string;
}

export interface TableRow {
  id: string;
  name: string;
  status: 'Completed' | 'Pending' | 'Failed';
  amount: number;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsDataService {
  readonly kpis = signal<KPI[]>([
    { id: '1', label: 'Total Revenue', value: '$45,231.89', trend: 20.1, icon: 'dollar-sign' },
    { id: '2', label: 'Subscriptions', value: '+2,350', trend: 180.1, icon: 'users' },
    { id: '3', label: 'Sales', value: '+12,234', trend: 19, icon: 'credit-card' },
    { id: '4', label: 'Active Now', value: '573', trend: -2.5, icon: 'activity' }
  ]);

  readonly activityData = signal<ActivityData[]>([
    { time: 'Jan', revenue: 4000, users: 2400 },
    { time: 'Feb', revenue: 3000, users: 1398 },
    { time: 'Mar', revenue: 2000, users: 9800 },
    { time: 'Apr', revenue: 2780, users: 3908 },
    { time: 'May', revenue: 1890, users: 4800 },
    { time: 'Jun', revenue: 2390, users: 3800 },
    { time: 'Jul', revenue: 3490, users: 4300 },
  ]);

  readonly categoryData = signal<CategoryData[]>([
    { name: 'Desktop', value: 45, color: '#3b82f6' },
    { name: 'Mobile', value: 35, color: '#8b5cf6' },
    { name: 'Tablet', value: 20, color: '#10b981' }
  ]);
  
  readonly recentTransactions = signal<TableRow[]>([
    { id: 'INV001', name: 'John Doe', status: 'Completed', amount: 250.00, date: '2023-10-01' },
    { id: 'INV002', name: 'Jane Smith', status: 'Pending', amount: 150.00, date: '2023-10-02' },
    { id: 'INV003', name: 'Bob Johnson', status: 'Failed', amount: 350.00, date: '2023-10-03' },
    { id: 'INV004', name: 'Alice Brown', status: 'Completed', amount: 450.00, date: '2023-10-04' },
    { id: 'INV005', name: 'Charlie Davis', status: 'Completed', amount: 125.00, date: '2023-10-05' },
    { id: 'INV006', name: 'Diana Evans', status: 'Pending', amount: 550.00, date: '2023-10-06' },
    { id: 'INV007', name: 'Evan Frank', status: 'Completed', amount: 75.00, date: '2023-10-07' },
  ]);
}
