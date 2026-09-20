import { ChartConfiguration, ChartOptions } from 'chart.js';

export type TimeRange = '7d' | '30d' | '90d';

export interface AnalyticsKpis {
  sessions: number;
  sessionsGrowth: number;
  conversion: number;
  conversionGrowth: number;
  bounceRate: number;
  bounceGrowth: number;
  duration: string;
  durationGrowth: number;
}

export interface AnalyticsData {
  kpis: AnalyticsKpis;
  barChartData: ChartConfiguration<'bar'>['data'];
  radarChartData: ChartConfiguration<'radar'>['data'];
  lineChartData: ChartConfiguration<'line'>['data'];
  polarChartData: ChartConfiguration<'polarArea'>['data'];
}
