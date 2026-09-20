import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideDynamicIcon } from '@lucide/angular';
import { CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent } from '../../../../shared/components/card/card.component';
import { KPI } from '../../../../core/services/analytics-data.service';
import { SkeletonComponent } from '../../../../shared/components/skeleton/skeleton.component';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule, LucideDynamicIcon, CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent, SkeletonComponent],
  template: `
    <app-card>
      <app-card-header class="flex flex-row items-center justify-between space-y-0 pb-2">
        <app-card-title class="text-sm font-medium">{{ stat().label }}</app-card-title>
        <svg [lucideIcon]="stat().icon" class="h-4 w-4 text-muted-foreground"></svg>
      </app-card-header>
      <app-card-content>
        @if (isLoading()) {
          <app-skeleton height="32px" width="50%" className="mb-2"></app-skeleton>
        } @else {
          <div class="text-2xl font-bold">{{ stat().value }}</div>
        }
        
        @if (isLoading()) {
          <app-skeleton height="16px" width="80%"></app-skeleton>
        } @else {
          <p class="text-xs text-muted-foreground mt-1 flex items-center">
            @if (stat().trend > 0) {
              <span class="text-green-600 font-medium flex items-center mr-1">
                <svg lucideIcon="trending-up" class="h-3 w-3 mr-0.5"></svg>
                +{{ stat().trend }}%
              </span>
            } @else {
              <span class="text-destructive font-medium flex items-center mr-1">
                <svg lucideIcon="trending-down" class="h-3 w-3 mr-0.5"></svg>
                {{ stat().trend }}%
              </span>
            }
            vs last month
          </p>
        }
      </app-card-content>
    </app-card>
  `
})
export class StatCardComponent {
  stat = input.required<KPI>();
  isLoading = input<boolean>(false);
}
