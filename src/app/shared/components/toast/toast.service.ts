import { Injectable, signal } from '@angular/core';

export type ToastType = 'default' | 'success' | 'destructive' | 'warning' | 'info';

export interface Toast {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
  duration?: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts = signal<Toast[]>([]);

  show(toast: Omit<Toast, 'id'>) {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { ...toast, id };
    this.toasts.update(t => [...t, newToast]);

    if (toast.duration !== 0) {
      setTimeout(() => this.remove(id), toast.duration || 4000);
    }
  }

  default(title: string, description?: string) {
    this.show({ title, description, type: 'default' });
  }

  success(title: string, description?: string) {
    this.show({ title, description, type: 'success' });
  }

  error(title: string, description?: string, duration: number = 5000) {
    this.show({ title, description, type: 'destructive', duration });
  }

  warning(title: string, description?: string) {
    this.show({ title, description, type: 'warning' });
  }
  
  info(title: string, description?: string) {
    this.show({ title, description, type: 'info' });
  }

  remove(id: string) {
    this.toasts.update(t => t.filter(toast => toast.id !== id));
  }
}
