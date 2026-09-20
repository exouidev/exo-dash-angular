import { Component, computed, effect, input, ViewChild, inject, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonComponent } from '../../../../shared/components/skeleton/skeleton.component';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent } from '../../../../shared/components/card/card.component';
import { ThemeService } from '../../../../core/services/theme.service';
import { CategoryData } from '../../../../core/services/analytics-data.service';

@Component({
  selector: 'app-category-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, SkeletonComponent, CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent],
  template: `
    <app-card className="h-full flex flex-col" class="h-full block">
      <app-card-header>
        <app-card-title>Sales by Category</app-card-title>
      </app-card-header>
      <app-card-content className="flex flex-col justify-center flex-1">
         <div class="relative w-full overflow-hidden">
         @if (isLoading()) {
            <app-skeleton height="300px" width="100%"></app-skeleton>
         } @else {
            <canvas baseChart
              [type]="'radar'"
              [data]="chartData()"
              [options]="chartOptions()"
              style="width: 100%; height: 300px; display: block;">
            </canvas>
         }
         </div>
      </app-card-content>
    </app-card>
  `
})
export class CategoryChartComponent {
  themeService = inject(ThemeService);
  isLoading = input<boolean>(false);
  
  @ViewChildren(BaseChartDirective) charts?: QueryList<BaseChartDirective>;

  constructor() {
    effect(() => {
      this.themeService.currentTheme();
      if (this.charts) {
        setTimeout(() => this.charts?.forEach(c => c.render()));
      }
    });
  }

  chartData = computed<ChartConfiguration<'radar'>['data']>(() => {
    return {
      labels: ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Toys'],
      datasets: [
        {
          label: 'Current Month',
          data: [65, 59, 90, 81, 56, 55],
          fill: true,
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          borderColor: '#3b82f6',
          pointBackgroundColor: '#3b82f6',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#3b82f6'
        },
        {
          label: 'Previous Month',
          data: [28, 48, 40, 19, 96, 27],
          fill: true,
          backgroundColor: 'rgba(16, 185, 129, 0.2)',
          borderColor: '#10b981',
          pointBackgroundColor: '#10b981',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#10b981'
        }
      ]
    };
  });

  chartOptions = computed<ChartOptions<'radar'>>(() => {
    const isDark = this.themeService.currentTheme() === 'dark';
    const textColor = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)';
    const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
    const angleLinesColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
    
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        r: {
          angleLines: {
            color: angleLinesColor
          },
          grid: {
            color: gridColor
          },
          pointLabels: {
            color: textColor
          },
          ticks: {
            display: false 
          }
        }
      }
    };
  });
}
