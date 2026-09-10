import { Component, computed, effect, input, ViewChild, inject, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent } from '../../../../shared/components/card/card.component';
import { ThemeService } from '../../../../core/services/theme.service';

@Component({
  selector: 'app-category-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent],
  template: `
    <app-card className="h-full flex flex-col" class="h-full block">
      <app-card-header>
        <app-card-title>Traffic Sources</app-card-title>
      </app-card-header>
      <app-card-content className="flex flex-col justify-center flex-1">
         <canvas baseChart
          [type]="'radar'"
          [data]="chartData()"
          [options]="chartOptions()"
          style="width: 100%; height: 300px; display: block;">
        </canvas>
      </app-card-content>
    </app-card>
  `
})
export class CategoryChartComponent {
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

  chartData = computed<ChartConfiguration<'radar'>['data']>(() => {
    return {
      labels: ['Organic Search', 'Direct', 'Social Media', 'Email', 'Referral', 'Paid Ads'],
      datasets: [
        {
          label: 'Traffic Score',
          data: [85, 65, 90, 45, 75, 55],
          backgroundColor: 'rgba(59, 130, 246, 0.2)', // blue-500
          borderColor: '#3b82f6',
          pointBackgroundColor: '#3b82f6',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#3b82f6'
        }
      ]
    };
  });

  chartOptions = computed<ChartOptions<'radar'>>(() => {
    const isDark = this.themeService.currentTheme() === 'dark';
    const textColor = isDark ? '#e4e4e7' : '#3f3f46';
    const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
    
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          theme: isDark ? 'dark' : 'light'
        } as any
      },
      scales: {
        r: {
          grid: { color: gridColor },
          angleLines: { color: gridColor },
          pointLabels: { color: textColor, font: { size: 12 } },
          ticks: { display: false } // Hide numbers mapped to the rings
        }
      }
    };
  });
}
