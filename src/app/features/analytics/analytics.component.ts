import { Component, signal, computed, ViewChildren, QueryList, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { ThemeService } from '../../core/services/theme.service';
import { LucideDynamicIcon } from '@lucide/angular';
import { CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent, CardDescriptionComponent } from '../../shared/components/card/card.component';

type TimeRange = '7d' | '30d' | '90d';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    CommonModule,
    LucideDynamicIcon,
    BaseChartDirective,
    CardComponent,
    CardContentComponent,
    CardHeaderComponent,
    CardTitleComponent,
    CardDescriptionComponent,
  ],
  template: `
    <div class="flex-1 space-y-4">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Advanced Analytics</h1>
          <p class="text-muted-foreground mt-1">
            Deep dive into user behavior, engagement metrics, and audience demographics.
          </p>
        </div>

        <div class="inline-flex items-center rounded-md border p-1 bg-muted/20">
          <button (click)="timeRange.set('7d')" [class]="timeRange() === '7d' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'" class="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all">7 Days</button>
          <button (click)="timeRange.set('30d')" [class]="timeRange() === '30d' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'" class="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all">30 Days</button>
          <button (click)="timeRange.set('90d')" [class]="timeRange() === '90d' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'" class="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all">90 Days</button>
        </div>
      </div>

      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <app-card>
          <app-card-header class="flex flex-row items-center justify-between space-y-0 pb-2">
            <app-card-title class="text-sm font-medium">Total Sessions</app-card-title>
            <svg lucideIcon="activity" class="h-4 w-4 text-muted-foreground"></svg>
          </app-card-header>
          <app-card-content>
            <div class="text-2xl font-bold">{{ kpis().sessions | number }}</div>
            <p class="text-xs text-muted-foreground mt-1 flex items-center">
              <span class="text-green-600 font-medium flex items-center mr-1">
                <svg lucideIcon="trending-up" class="h-3 w-3 mr-0.5"></svg> +{{ kpis().sessionsGrowth }}%
              </span>
              vs previous period
            </p>
          </app-card-content>
        </app-card>

        <app-card>
          <app-card-header class="flex flex-row items-center justify-between space-y-0 pb-2">
            <app-card-title class="text-sm font-medium">User Conversion</app-card-title>
            <svg lucideIcon="mouse-pointer-click" class="h-4 w-4 text-muted-foreground"></svg>
          </app-card-header>
          <app-card-content>
            <div class="text-2xl font-bold">{{ kpis().conversion | number:'1.1-2' }}%</div>
            <p class="text-xs text-muted-foreground mt-1 flex items-center">
              <span class="text-green-600 font-medium flex items-center mr-1">
                <svg lucideIcon="trending-up" class="h-3 w-3 mr-0.5"></svg> +{{ kpis().conversionGrowth }}%
              </span>
              vs previous period
            </p>
          </app-card-content>
        </app-card>

        <app-card>
          <app-card-header class="flex flex-row items-center justify-between space-y-0 pb-2">
            <app-card-title class="text-sm font-medium">Bounce Rate</app-card-title>
            <svg lucideIcon="clock" class="h-4 w-4 text-muted-foreground"></svg>
          </app-card-header>
          <app-card-content>
            <div class="text-2xl font-bold">{{ kpis().bounceRate }}%</div>
            <p class="text-xs text-muted-foreground mt-1 flex items-center">
              <span class="text-destructive font-medium flex items-center mr-1">
                <svg lucideIcon="trending-up" class="h-3 w-3 mr-0.5"></svg> +{{ kpis().bounceGrowth }}%
              </span>
              vs previous period
            </p>
          </app-card-content>
        </app-card>

        <app-card>
          <app-card-header class="flex flex-row items-center justify-between space-y-0 pb-2">
            <app-card-title class="text-sm font-medium">Avg. Session Duration</app-card-title>
            <svg lucideIcon="clock" class="h-4 w-4 text-muted-foreground"></svg>
          </app-card-header>
          <app-card-content>
            <div class="text-2xl font-bold">{{ kpis().duration }}</div>
            <p class="text-xs text-muted-foreground mt-1 flex items-center">
              <span class="text-green-600 font-medium flex items-center mr-1">
                <svg lucideIcon="trending-up" class="h-3 w-3 mr-0.5"></svg> +{{ kpis().durationGrowth }}%
              </span>
              vs previous period
            </p>
          </app-card-content>
        </app-card>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-7 gap-6">
        <app-card class="lg:col-span-4 block h-full" className="h-full flex flex-col">
          <app-card-header>
            <app-card-title>User Engagement by Channel</app-card-title>
            <app-card-description>Comparison of acquired vs active users per marketing channel.</app-card-description>
          </app-card-header>
          <app-card-content class="pt-2 pl-2 flex-1">
            <canvas baseChart [data]="barChartData()" [options]="barChartOptions()" [type]="'bar'" style="width: 100%; height: 300px; display: block;"></canvas>
          </app-card-content>
        </app-card>

        <app-card class="lg:col-span-3 block h-full" className="h-full flex flex-col">
          <app-card-header>
            <app-card-title>Audience Interests</app-card-title>
            <app-card-description>Demographic radar showing user affinities.</app-card-description>
          </app-card-header>
          <app-card-content class="flex items-center justify-center pt-2 flex-1">
            <canvas baseChart [data]="radarChartData()" [options]="radarChartOptions()" [type]="'radar'" style="width: 100%; height: 300px; display: block;"></canvas>
          </app-card-content>
        </app-card>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-7 gap-6">
        <app-card class="lg:col-span-4 block h-full" className="h-full flex flex-col">
          <app-card-header>
            <app-card-title>Activity</app-card-title>
            <app-card-description>User session concentration by day and time.</app-card-description>
          </app-card-header>
          <app-card-content class="pt-2 pl-2 flex-1">
            <canvas baseChart [data]="lineChartData()" [options]="lineChartOptions()" [type]="'line'" style="width: 100%; height: 300px; display: block;"></canvas>
          </app-card-content>
        </app-card>

        <app-card class="lg:col-span-3 block h-full" className="h-full flex flex-col">
          <app-card-header>
            <app-card-title>Goal Completions</app-card-title>
            <app-card-description>Multi-goal tracking against target metrics.</app-card-description>
          </app-card-header>
          <app-card-content class="flex items-center justify-center pt-2 flex-1">
            <canvas baseChart [data]="polarChartData()" [options]="polarChartOptions()" [type]="'polarArea'" style="width: 100%; height: 300px; display: block;"></canvas>
          </app-card-content>
        </app-card>
      </div>
    </div>
  `
})
export class AnalyticsComponent {
  themeService = inject(ThemeService);
  timeRange = signal<TimeRange>('30d');
  
  @ViewChildren(BaseChartDirective) charts?: QueryList<BaseChartDirective>;

  constructor() {
    effect(() => {
      this.themeService.currentTheme();
      if (this.charts) {
        setTimeout(() => this.charts?.forEach(c => c.render()));
      }
    });
  }

  selectedDays = computed(() => {
    const range = this.timeRange();
    if (range === '7d') return 7;
    if (range === '90d') return 90;
    return 30;
  });

  kpis = computed(() => {
     switch (this.timeRange()) {
       case '7d': return { sessions: 12450, sessionsGrowth: 4.2, conversion: 2.4, conversionGrowth: 0.8, bounceRate: 42, bounceGrowth: 1.2, duration: '2m 14s', durationGrowth: 3.1 };
       case '90d': return { sessions: 218450, sessionsGrowth: 12.8, conversion: 3.1, conversionGrowth: 2.1, bounceRate: 38, bounceGrowth: -2.4, duration: '3m 05s', durationGrowth: 5.4 };
       default: return { sessions: 48200, sessionsGrowth: 8.4, conversion: 2.8, conversionGrowth: 1.4, bounceRate: 40, bounceGrowth: -0.5, duration: '2m 45s', durationGrowth: 2.1 };
     }
  });

  barChartData = computed<ChartConfiguration<'bar'>['data']>(() => {
    const range = this.timeRange();
    let acquired = [76, 85, 101, 98, 87, 105];
    let active = [35, 41, 36, 26, 45, 48];
    if (range === '7d') {
      acquired = [44, 55, 41, 67, 22, 43];
      active = [13, 23, 20, 8, 13, 27];
    }
    return {
      labels: ['Direct', 'Organic Search', 'Referral', 'Social', 'Email', 'Paid Ads'],
      datasets: [
        { data: acquired, label: 'Acquired', backgroundColor: '#3b82f6', borderRadius: 4 },
        { data: active, label: 'Active', backgroundColor: '#10b981', borderRadius: 4 }
      ]
    };
  });

  barChartOptions = computed<ChartOptions<'bar'>>(() => {
    const isDark = this.themeService.currentTheme() === 'dark';
    const color = isDark ? '#a1a1aa' : '#71717a';
    const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: { ticks: { color }, grid: { color: gridColor } },
        y: { ticks: { color }, grid: { color: gridColor } }
      }
    };
  });

  radarChartData = computed<ChartConfiguration<'radar'>['data']>(() => {
    return {
      labels: ['Tech', 'Sports', 'Gaming', 'Finance', 'Design', 'News'],
      datasets: [
        {
          label: 'User Affinity',
          data: [80, 50, 30, 40, 100, 20],
          backgroundColor: 'rgba(139, 92, 246, 0.2)',
          borderColor: '#8b5cf6',
          pointBackgroundColor: '#8b5cf6'
        }
      ]
    };
  });

  radarChartOptions = computed<ChartOptions<'radar'>>(() => {
    const isDark = this.themeService.currentTheme() === 'dark';
    const color = isDark ? '#e4e4e7' : '#3f3f46';
    const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
    return {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          grid: { color: gridColor },
          angleLines: { color: gridColor },
          pointLabels: { color }, ticks: { display: false }
        }
      },
      plugins: {
        legend: { display: false }
      }
    };
  });

  lineChartData = computed<ChartConfiguration<'line'>['data']>(() => {
    const range = this.timeRange();
    const generateData = (count: number, yrange: {min: number, max: number}) => {
      let i = 0; let series = [];
      while (i < count) { series.push(Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min); i++; }
      return series;
    };
    return {
      labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      datasets: [
        { label: '10am', data: generateData(7, { min: range === '7d' ? 0 : 20, max: 90 }), borderColor: 'rgba(59, 130, 246, 1)', tension: 0.3 },
        { label: '12pm', data: generateData(7, { min: range === '7d' ? 10 : 30, max: 100 }), borderColor: 'rgba(16, 185, 129, 1)', tension: 0.3 },
        { label: '2pm', data: generateData(7, { min: range === '7d' ? 5 : 40, max: 90 }), borderColor: 'rgba(245, 158, 11, 1)', tension: 0.3 },
      ]
    };
  });

  lineChartOptions = computed<ChartOptions<'line'>>(() => {
    const isDark = this.themeService.currentTheme() === 'dark';
    const color = isDark ? '#a1a1aa' : '#71717a';
    const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
    return {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { ticks: { color }, grid: { color: gridColor } },
        y: { ticks: { color }, grid: { color: gridColor } }
      }
    };
  });

  polarChartData = computed<ChartConfiguration<'polarArea'>['data']>(() => {
    const range = this.timeRange();
    let data = [76, 67, 83];
    if (range === '7d') data = [71, 63, 77];
    if (range === '90d') data = [85, 74, 91];
    return {
      labels: ['Signups', 'Purchases', 'Returns'],
      datasets: [{
        data,
        backgroundColor: ['rgba(59, 130, 246, 0.6)', 'rgba(16, 185, 129, 0.6)', 'rgba(245, 158, 11, 0.6)'],
      }]
    };
  });

  polarChartOptions = computed<ChartOptions<'polarArea'>>(() => {
    const isDark = this.themeService.currentTheme() === 'dark';
    const color = isDark ? '#a1a1aa' : '#71717a';
    const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
    return {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          grid: { color: gridColor },
          angleLines: { color: gridColor },
          ticks: { display: false }
        }
      }
    };
  });
}
