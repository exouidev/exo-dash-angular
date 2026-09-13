import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AnalyticsDataService } from '../../core/services/analytics-data.service';
import { StatCardComponent } from './components/stat-card/stat-card.component';
import { RevenueChartComponent } from './components/revenue-chart/revenue-chart.component';
import { CategoryChartComponent } from './components/category-chart/category-chart.component';
import { TableComponent } from '../../shared/components/table/table.component';
import { CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent } from '../../shared/components/card/card.component';
import { BadgeComponent } from '../../shared/components/badge/badge.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    StatCardComponent,
    RevenueChartComponent,
    CategoryChartComponent,
    TableComponent,
    CardComponent,
    CardHeaderComponent,
    CardTitleComponent,
    CardContentComponent,
    BadgeComponent
  ],
  template: `
    <div class="flex-1 space-y-4">
      <div class="flex items-center justify-between space-y-2">
        <h2 class="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      <!-- KPI Cards -->
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        @for (kpi of dataService.kpis(); track kpi.id) {
          <app-stat-card [stat]="kpi"></app-stat-card>
        }
      </div>

      <!-- Charts -->
      <div class="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
        <app-revenue-chart class="lg:col-span-2 block min-w-0" [data]="dataService.activityData()"></app-revenue-chart>
        <app-category-chart class="block min-w-0"></app-category-chart>
      </div>

      <!-- Recent Transactions Table -->
      <app-card>
        <app-card-header>
          <app-card-title>Recent Transactions</app-card-title>
        </app-card-header>
        <app-card-content>
          <div class="mb-4">
            <input
              type="text"
              placeholder="Search transactions..."
              class="flex h-9 w-full md:w-1/3 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              (input)="onSearch($event)"
            />
          </div>

          <app-table
            [data]="dataService.recentTransactions()"
            [columns]="tableColumns"
            [searchQuery]="searchQuery()"
            [pageSize]="5"
          >
            <!-- Define custom cell template for Status column -->
            <ng-template #cellTemplate let-row let-col="col">
              @if (col.key === 'status') {
                <app-badge [variant]="getBadgeVariant(row.status)">
                  {{ row.status }}
                </app-badge>
              } @else if (col.key === 'amount') {
                <span class="font-medium">{{ '$' }}{{ row.amount | number:'1.2-2' }}</span>
              } @else {
                {{ row[col.key] }}
              }
            </ng-template>
          </app-table>
        </app-card-content>
      </app-card>
    </div>
  `
})
export class DashboardComponent {
  dataService = inject(AnalyticsDataService);

  tableColumns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Customer' },
    { key: 'status', label: 'Status' },
    { key: 'date', label: 'Date' },
    { key: 'amount', label: 'Amount' }
  ];

  searchQuery = signal<string>('');

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  getBadgeVariant(status: string): 'default' | 'secondary' | 'destructive' | 'outline' {
    switch (status) {
      case 'Completed': return 'default';
      case 'Pending': return 'secondary';
      case 'Failed': return 'destructive';
      default: return 'outline';
    }
  }
}
