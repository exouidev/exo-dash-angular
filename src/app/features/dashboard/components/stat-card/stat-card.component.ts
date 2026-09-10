import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideDynamicIcon } from '@lucide/angular';
import { CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent } from '../../../../shared/components/card/card.component';
import { KPI } from '../../../../core/services/analytics-data.service';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule, LucideDynamicIcon, CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent],
  template: `
    <app-card>
      <app-card-header class="flex flex-row items-center justify-between space-y-0 pb-2">
        <app-card-title class="text-sm font-medium">
          {{ stat().label }}
        </app-card-title>
        <svg [lucideIcon]="stat().icon" class="h-4 w-4 text-muted-foreground"></svg>
      </app-card-header>
      <app-card-content>
        <div class="text-2xl font-bold">{{ stat().value }}</div>
        <p class="text-xs text-muted-foreground mt-1">
          <span [class.text-green-600]="stat().trend > 0" [class.text-red-600]="stat().trend < 0" class="font-medium flex items-center inline-flex">
            @if (stat().trend > 0) {
              ↑
            } @else {
              ↓
            }
            {{ stat().trend }}%
          </span>
          from last month
        </p>
      </app-card-content>
    </app-card>
  `
})
export class StatCardComponent {
  stat = input.required<KPI>();
}
