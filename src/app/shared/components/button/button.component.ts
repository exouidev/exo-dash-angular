import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type()"
      [class]="computedClasses()"
      [disabled]="disabled()"
    >
      <ng-content></ng-content>
    </button>
  `
})
export class ButtonComponent {
  variant = input<'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'outline-success' | 'outline-info' | 'outline-warning'>('default');
  size = input<'default' | 'sm' | 'lg' | 'icon'>('default');
  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input<boolean>(false);
  className = input<string>('');

  computedClasses(): string {
    const baseClasses = 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50';
    
    const variants: Record<string, string> = {
      default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
      destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
      outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
      'outline-success': 'border border-input bg-background shadow-sm hover:bg-green-50 hover:text-green-600 hover:border-green-600 dark:hover:bg-green-950/50 dark:hover:text-green-400 dark:hover:border-green-500',
      'outline-info': 'border border-input bg-background shadow-sm hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 dark:hover:bg-blue-950/50 dark:hover:text-blue-400 dark:hover:border-blue-500',
      'outline-warning': 'border border-input bg-background shadow-sm hover:bg-amber-50 hover:text-amber-600 hover:border-amber-600 dark:hover:bg-amber-950/50 dark:hover:text-amber-400 dark:hover:border-amber-500',
      secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline'
    };

    const sizes: Record<string, string> = {
      default: 'h-9 px-4 py-2',
      sm: 'h-8 rounded-md px-3 text-xs',
      lg: 'h-10 rounded-md px-8',
      icon: 'h-9 w-9'
    };

    return `${baseClasses} ${variants[this.variant()]} ${sizes[this.size()]} ${this.className()}`;
  }
}
