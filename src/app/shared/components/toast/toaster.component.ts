import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideDynamicIcon } from '@lucide/angular';
import { ToastService, Toast } from './toast.service';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [CommonModule, LucideDynamicIcon],
  template: `
    <div class="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px] pointer-events-none gap-2">
      @for (toast of toastService.toasts(); track toast.id) {
        <div 
          class="pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all"
          [ngClass]="getToastClasses(toast.type)"
          style="animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
        >
          <div class="flex gap-3">
            @if (toast.type === 'success') { <svg lucideIcon="check-circle" class="h-5 w-5"></svg> }
            @if (toast.type === 'destructive') { <svg lucideIcon="alert-circle" class="h-5 w-5"></svg> }
            @if (toast.type === 'warning') { <svg lucideIcon="alert-triangle" class="h-5 w-5"></svg> }
            @if (toast.type === 'info') { <svg lucideIcon="info" class="h-5 w-5"></svg> }
            @if (toast.type === 'default') { <svg lucideIcon="bell" class="h-5 w-5 opacity-80"></svg> }
            
            <div class="grid gap-1">
              @if (toast.title) {
                <div class="text-sm font-semibold">{{ toast.title }}</div>
              }
              @if (toast.description) {
                <div class="text-sm opacity-90">{{ toast.description }}</div>
              }
            </div>
          </div>
          
          <button 
            (click)="toastService.remove(toast.id)"
            class="absolute right-2 top-2 rounded-md p-1 opacity-50 transition-opacity hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2"
          >
            <svg lucideIcon="x" class="h-4 w-4"></svg>
          </button>
        </div>
      }
    </div>

    <!-- Injecting simple CSS keyframes for animation since tailwindcss-animate might not be available -->
    <style>
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    </style>
  `
})
export class ToasterComponent {
  toastService = inject(ToastService);

  getToastClasses(type: string): string {
    const base = 'bg-background border border-border text-foreground shadow-lg';
    switch (type) {
      case 'success':
        return base + ' border-l-4 border-l-green-500';
      case 'destructive':
        return base + ' border-l-4 border-l-destructive';
      case 'warning':
        return base + ' border-l-4 border-l-amber-500';
      case 'info':
        return base + ' border-l-4 border-l-blue-500';
      default:
        return base;
    }
  }
}
