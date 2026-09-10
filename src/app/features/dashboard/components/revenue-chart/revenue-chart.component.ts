import { Component, computed, effect, input, ViewChild, inject, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent } from '../../../../shared/components/card/card.component';
import { ActivityData } from '../../../../core/services/analytics-data.service';
import { ThemeService } from '../../../../core/services/theme.service';

@Component({
  selector: 'app-revenue-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent],
  template: `
    <app-card className="h-full flex flex-col" class="h-full block">
      <app-card-header>
        <app-card-title>Revenue Overview</app-card-title>
      </app-card-header>
      <app-card-content className="flex-1">
         <canvas baseChart
          [type]="'line'"
          [data]="chartData()"
          [options]="chartOptions()"
          [legend]="false"
          style="width: 100%; height: 300px; display: block;">
        </canvas>
      </app-card-content>
    </app-card>
  `
})
export class RevenueChartComponent {
  data = input.required<ActivityData[]>();
  themeService = inject(ThemeService);
  
  @ViewChildren(BaseChartDirective) charts?: QueryList<BaseChartDirective>;

  constructor() {
    effect(() => {
      this.themeService.currentTheme();
      if (this.charts) {
        setTimeout(() => this.charts?.forEach(c => c.render()));
      }
    });
  }

  chartData = computed<ChartConfiguration<'line'>['data']>(() => {
    return {
      labels: this.data().map(d => d.time),
      datasets: [
        {
          label: "Revenue",
          data: this.data().map(d => d.revenue),
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.4)",
          fill: true,
          tension: 0.4
        },
        {
          label: "Users",
          data: this.data().map(d => d.users),
          borderColor: "#10b981",
          backgroundColor: "rgba(16, 185, 129, 0.4)",
          fill: true,
          tension: 0.4
        }
      ]
    };
  });

  chartOptions = computed<ChartOptions<'line'>>(() => {
    const isDark = this.themeService.currentTheme() === 'dark';
    const textColor = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
    
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: {
          grid: {
            color: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
          },
          ticks: {
            color: textColor
          }
        },
        y: {
          grid: {
            color: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
          },
          ticks: {
            color: textColor
          }
        }
      }
    };
  });
}
