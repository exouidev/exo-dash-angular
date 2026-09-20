import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { TimeRange, AnalyticsData, AnalyticsKpis } from './analytics.model';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  
  getAnalyticsData(range: TimeRange): Observable<AnalyticsData> {
    
    // Compute KPIs
    let kpis: AnalyticsKpis;
    switch (range) {
      case '7d': kpis = { sessions: 12450, sessionsGrowth: 4.2, conversion: 2.4, conversionGrowth: 0.8, bounceRate: 42, bounceGrowth: 1.2, duration: '2m 14s', durationGrowth: 3.1 }; break;
      case '90d': kpis = { sessions: 218450, sessionsGrowth: 12.8, conversion: 3.1, conversionGrowth: 2.1, bounceRate: 38, bounceGrowth: -2.4, duration: '3m 05s', durationGrowth: 5.4 }; break;
      default: kpis = { sessions: 48200, sessionsGrowth: 8.4, conversion: 2.8, conversionGrowth: 1.4, bounceRate: 40, bounceGrowth: -0.5, duration: '2m 45s', durationGrowth: 2.1 };
    }

    // Compute Bar Chart
    let acquired = [76, 85, 101, 98, 87, 105];
    let active = [35, 41, 36, 26, 45, 48];
    if (range === '7d') {
      acquired = [44, 55, 41, 67, 22, 43];
      active = [13, 23, 20, 8, 13, 27];
    }
    const barChartData = {
      labels: ['Direct', 'Organic Search', 'Referral', 'Social', 'Email', 'Paid Ads'],
      datasets: [
        { data: acquired, label: 'Acquired', backgroundColor: '#3b82f6', borderRadius: 4 },
        { data: active, label: 'Active', backgroundColor: '#10b981', borderRadius: 4 }
      ]
    };

    // Compute Radar Chart
    const radarChartData = {
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

    // Compute Line Chart
    const generateData = (count: number, yrange: {min: number, max: number}) => {
      let i = 0; let series = [];
      while (i < count) { series.push(Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min); i++; }
      return series;
    };
    
    let lineChartData = {
      labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      datasets: [
        { label: '10am', data: generateData(7, { min: range === '7d' ? 0 : 20, max: 90 }), borderColor: 'rgba(59, 130, 246, 1)', tension: 0.3 },
        { label: '12pm', data: generateData(7, { min: range === '7d' ? 10 : 30, max: 100 }), borderColor: 'rgba(16, 185, 129, 1)', tension: 0.3 },
        { label: '2pm', data: generateData(7, { min: range === '7d' ? 5 : 40, max: 90 }), borderColor: 'rgba(245, 158, 11, 1)', tension: 0.3 },
      ]
    };

    // Compute Polar Chart
    let polarData = [76, 67, 83];
    if (range === '7d') polarData = [71, 63, 77];
    if (range === '90d') polarData = [85, 74, 91];
    const polarChartData = {
      labels: ['Signups', 'Purchases', 'Returns'],
      datasets: [{
        data: polarData,
        backgroundColor: ['rgba(59, 130, 246, 0.6)', 'rgba(16, 185, 129, 0.6)', 'rgba(245, 158, 11, 0.6)'],
      }]
    };

    const data: AnalyticsData = {
      kpis,
      barChartData,
      radarChartData,
      lineChartData,
      polarChartData
    };
    
    // Fake network delay (500ms) to ensure charts re-render upon receiving asynchronous update
    return of(data).pipe(delay(300));
  }
}
