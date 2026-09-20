import { Component, signal, computed, ViewChildren, QueryList, effect, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { ThemeService } from '../../core/services/theme.service';
import { LucideDynamicIcon } from '@lucide/angular';
import { CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent, CardDescriptionComponent } from '../../shared/components/card/card.component';
import { TimeRange, AnalyticsData, AnalyticsKpis } from './analytics.model';
import { AnalyticsService } from './analytics.service';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';



@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    SkeletonComponent,
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
            @if (isLoading()) { <app-skeleton height="32px" width="40%" className="mb-2"></app-skeleton> } @else { <div class="text-2xl font-bold">{{ kpis()?.sessions | number }}</div> }
            @if (isLoading()) { <app-skeleton height="16px" width="70%"></app-skeleton> } @else { <p class="text-xs text-muted-foreground mt-1 flex items-center">
              <span class="text-green-600 font-medium flex items-center mr-1">
                <svg lucideIcon="trending-up" class="h-3 w-3 mr-0.5"></svg> +{{ kpis()?.sessionsGrowth }}%
              </span>
              vs previous period
            </p> }
          </app-card-content>
        </app-card>

        <app-card>
          <app-card-header class="flex flex-row items-center justify-between space-y-0 pb-2">
            <app-card-title class="text-sm font-medium">User Conversion</app-card-title>
            <svg lucideIcon="mouse-pointer-click" class="h-4 w-4 text-muted-foreground"></svg>
          </app-card-header>
          <app-card-content>
            @if (isLoading()) { <app-skeleton height="32px" width="40%" className="mb-2"></app-skeleton> } @else { <div class="text-2xl font-bold">{{ kpis()?.conversion | number:'1.1-2' }}%</div> }
            @if (isLoading()) { <app-skeleton height="16px" width="70%"></app-skeleton> } @else { <p class="text-xs text-muted-foreground mt-1 flex items-center">
              <span class="text-green-600 font-medium flex items-center mr-1">
                <svg lucideIcon="trending-up" class="h-3 w-3 mr-0.5"></svg> +{{ kpis()?.conversionGrowth }}%
              </span>
              vs previous period
            </p> }
          </app-card-content>
        </app-card>

        <app-card>
          <app-card-header class="flex flex-row items-center justify-between space-y-0 pb-2">
            <app-card-title class="text-sm font-medium">Bounce Rate</app-card-title>
            <svg lucideIcon="clock" class="h-4 w-4 text-muted-foreground"></svg>
          </app-card-header>
          <app-card-content>
            @if (isLoading()) { <app-skeleton height="32px" width="40%" className="mb-2"></app-skeleton> } @else { <div class="text-2xl font-bold">{{ kpis()?.bounceRate }}%</div> }
            @if (isLoading()) { <app-skeleton height="16px" width="70%"></app-skeleton> } @else { <p class="text-xs text-muted-foreground mt-1 flex items-center">
              <span class="text-destructive font-medium flex items-center mr-1">
                <svg lucideIcon="trending-up" class="h-3 w-3 mr-0.5"></svg> +{{ kpis()?.bounceGrowth }}%
              </span>
              vs previous period
            </p> }
          </app-card-content>
        </app-card>

        <app-card>
          <app-card-header class="flex flex-row items-center justify-between space-y-0 pb-2">
            <app-card-title class="text-sm font-medium">Avg. Session Duration</app-card-title>
            <svg lucideIcon="clock" class="h-4 w-4 text-muted-foreground"></svg>
          </app-card-header>
          <app-card-content>
            @if (isLoading()) { <app-skeleton height="32px" width="40%" className="mb-2"></app-skeleton> } @else { <div class="text-2xl font-bold">{{ kpis()?.duration }}</div> }
            @if (isLoading()) { <app-skeleton height="16px" width="70%"></app-skeleton> } @else { <p class="text-xs text-muted-foreground mt-1 flex items-center">
              <span class="text-green-600 font-medium flex items-center mr-1">
                <svg lucideIcon="trending-up" class="h-3 w-3 mr-0.5"></svg> +{{ kpis()?.durationGrowth }}%
              </span>
              vs previous period
            </p> }
          </app-card-content>
        </app-card>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-7 gap-6">
        <app-card class="lg:col-span-4 block h-full min-w-0" className="h-full flex flex-col">
          <app-card-header>
            <app-card-title>User Engagement by Channel</app-card-title>
            <app-card-description>Comparison of acquired vs active users per marketing channel.</app-card-description>
          </app-card-header>
          <app-card-content class="pt-2 pl-2 flex-1">
            <div class="relative w-full overflow-hidden">
              @if (isLoading()) {
                <app-skeleton height="300px" width="100%"></app-skeleton>
              } @else if (barChartData()) {
                <canvas baseChart [data]="barChartData()!" [options]="barChartOptions()" [type]="'bar'" style="width: 100%; height: 300px; display: block;"></canvas>
              }
            </div>
          </app-card-content>
        </app-card>

        <app-card class="lg:col-span-3 block h-full min-w-0" className="h-full flex flex-col">
          <app-card-header>
            <app-card-title>Audience Interests</app-card-title>
            <app-card-description>Demographic radar showing user affinities.</app-card-description>
          </app-card-header>
          <app-card-content class="pt-2 flex-1 w-full flex-col">
            <div class="relative w-full overflow-hidden">
              @if (isLoading()) {
                <app-skeleton height="300px" width="100%"></app-skeleton>
              } @else if (radarChartData()) {
                <canvas baseChart [data]="radarChartData()!" [options]="radarChartOptions()" [type]="'radar'" style="width: 100%; height: 300px; display: block;"></canvas>
              }
            </div>
          </app-card-content>
        </app-card>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-7 gap-6">
        <app-card class="lg:col-span-4 block h-full min-w-0" className="h-full flex flex-col">
          <app-card-header>
            <app-card-title>Activity</app-card-title>
            <app-card-description>User session concentration by day and time.</app-card-description>
          </app-card-header>
          <app-card-content class="pt-2 pl-2 flex-1">
            <div class="relative w-full overflow-hidden">
              @if (isLoading()) {
                <app-skeleton height="300px" width="100%"></app-skeleton>
              } @else if (lineChartData()) {
                <canvas baseChart [data]="lineChartData()!" [options]="lineChartOptions()" [type]="'line'" style="width: 100%; height: 300px; display: block;"></canvas>
              }
            </div>
          </app-card-content>
        </app-card>

        <app-card class="lg:col-span-3 block h-full min-w-0" className="h-full flex flex-col">
          <app-card-header>
            <app-card-title>Goal Completions</app-card-title>
            <app-card-description>Multi-goal tracking against target metrics.</app-card-description>
          </app-card-header>
          <app-card-content class="pt-2 flex-1 w-full flex-col">
            <div class="relative w-full overflow-hidden">
              @if (isLoading()) {
                <app-skeleton height="300px" width="100%"></app-skeleton>
              } @else if (polarChartData()) {
                <canvas baseChart [data]="polarChartData()!" [options]="polarChartOptions()" [type]="'polarArea'" style="width: 100%; height: 300px; display: block;"></canvas>
              }
            </div>
          </app-card-content>
        </app-card>
      </div>
    </div>
  `
})
export class AnalyticsComponent implements OnInit {
  themeService = inject(ThemeService);
  private analyticsService = inject(AnalyticsService);

  timeRange = signal<TimeRange>('30d');
  isLoading = signal(false);
  
  // Data State
  kpis = signal<AnalyticsKpis | null>(null);
  barChartData = signal<ChartConfiguration<'bar'>['data'] | null>(null);
  radarChartData = signal<ChartConfiguration<'radar'>['data'] | null>(null);
  lineChartData = signal<ChartConfiguration<'line'>['data'] | null>(null);
  polarChartData = signal<ChartConfiguration<'polarArea'>['data'] | null>(null);
  
  @ViewChildren(BaseChartDirective) charts?: QueryList<BaseChartDirective>;

  constructor() {
    effect(() => {
      this.themeService.currentTheme();
      if (this.charts) {
        setTimeout(() => this.charts?.forEach(c => c.render()));
      }
    });

    // Reactively fetch data whenever timeRange changes
    effect(() => {
      const range = this.timeRange();
      this.fetchData(range);
    });
  }

  ngOnInit() {
    // Initial fetch handled by effect on load
  }

  fetchData(range: TimeRange) {
    this.isLoading.set(true);
    this.analyticsService.getAnalyticsData(range).subscribe(data => {
      this.kpis.set(data.kpis);
      this.barChartData.set(data.barChartData);
      this.radarChartData.set(data.radarChartData);
      this.lineChartData.set(data.lineChartData);
      this.polarChartData.set(data.polarChartData);
      this.isLoading.set(false);
    });
  }

  barChartOptions = computed<ChartOptions<'bar'>>(() => {
    const isDark = this.themeService.currentTheme() === 'dark';
    const color = isDark ? '#a1a1aa' : '#71717a';
    const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color }, grid: { color: gridColor } },
        y: { ticks: { color }, grid: { color: gridColor } }
      }
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
      plugins: { legend: { display: false } }
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
