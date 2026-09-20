import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [CommonModule],
  host: { '[style.display]': "'block'", '[style.width]': 'width' },
  template: `
    <div
      class="animate-pulse rounded-md bg-primary/10"
      [class]="className"
      [style.width]="'100%'"
      [style.height]="height"
      [style.border-radius]="borderRadius"
    ></div>
  `
})
export class SkeletonComponent {
  @Input() className: string = '';
  @Input() width: string = '100%';
  @Input() height: string = '20px';
  @Input() borderRadius: string = '0.375rem'; // rounded-md
}
