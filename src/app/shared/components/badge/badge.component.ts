import { Component, input } from '@angular/core';

@Component({
  selector: 'app-badge',
  standalone: true,
  template: `
    <div [class]="computedClasses()">
      <ng-content></ng-content>
    </div>
  `
})
export class BadgeComponent {
  variant = input<'default' | 'secondary' | 'destructive' | 'outline'>('default');
  className = input<string>('');

  computedClasses(): string {
    const baseClasses = 'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';
    
    const variants: Record<string, string> = {
      default: 'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
      secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
      destructive: 'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
      outline: 'text-foreground'
    };

    return `${baseClasses} ${variants[this.variant()]} ${this.className()}`;
  }
}
