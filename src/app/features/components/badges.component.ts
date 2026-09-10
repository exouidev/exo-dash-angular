import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideDynamicIcon } from '@lucide/angular';
import { BadgeComponent } from '../../shared/components/badge/badge.component';
import { CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent, CardDescriptionComponent } from '../../shared/components/card/card.component';

@Component({
  selector: 'app-badges-demo',
  standalone: true,
  imports: [
    CommonModule, LucideDynamicIcon,
    BadgeComponent,     CardComponent, CardHeaderComponent, 
    CardTitleComponent, CardContentComponent, CardDescriptionComponent
  ],
  template: `
    <div class="flex-1 space-y-6 pb-8">
      <div>
        <h2 class="text-3xl font-bold tracking-tight">Badges</h2>
        <p class="text-muted-foreground mt-2">Versatile pill-shaped visual indicators.</p>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <app-card class="block h-full" className="h-full flex flex-col">
          <app-card-header>
            <app-card-title>Variants</app-card-title>
            <app-card-description>Standard theme variations.</app-card-description>
          </app-card-header>
          <app-card-content className="flex-1 flex flex-wrap gap-4">
            <app-badge variant="default">Default</app-badge>
            <app-badge variant="secondary">Secondary</app-badge>
            <app-badge variant="destructive">Destructive</app-badge>
            <app-badge variant="outline">Outline</app-badge>
          </app-card-content>
        </app-card>

        <app-card class="block h-full" className="h-full flex flex-col">
          <app-card-header>
            <app-card-title>With Icons</app-card-title>
            <app-card-description>Combine text constraints with inline SVGs.</app-card-description>
          </app-card-header>
          <app-card-content className="flex-1 flex flex-wrap gap-4">
            <app-badge variant="default">
              <svg lucideIcon="check" class="mr-1 h-3 w-3"></svg> Success
            </app-badge>
            <app-badge variant="destructive">
              <svg lucideIcon="alert-circle" class="mr-1 h-3 w-3"></svg> Failed
            </app-badge>
            <app-badge variant="secondary">
              <svg lucideIcon="clock" class="mr-1 h-3 w-3"></svg> Pending
            </app-badge>
            <app-badge variant="outline">
               New <svg lucideIcon="tag" class="ml-1 h-3 w-3"></svg>
            </app-badge>
          </app-card-content>
        </app-card>

        <app-card class="md:col-span-2 block">
          <app-card-header>
            <app-card-title>Table Integration</app-card-title>
            <app-card-description>Applying badges to semantic data grid contexts.</app-card-description>
          </app-card-header>
          <app-card-content className="flex-1">
            <div class="w-full rounded-md border">
              <table class="w-full text-sm">
                <thead class="border-b bg-muted/50">
                  <tr>
                    <th class="h-10 px-4 text-left font-medium text-muted-foreground align-middle">Invoice</th>
                    <th class="h-10 px-4 text-left font-medium text-muted-foreground align-middle">Status</th>
                    <th class="h-10 px-4 text-left font-medium text-muted-foreground align-middle">Method</th>
                    <th class="h-10 px-4 text-right font-medium text-muted-foreground align-middle">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b hover:bg-muted/50 transition-colors">
                    <td class="p-4 align-middle font-medium">INV001</td>
                    <td class="p-4 align-middle"><app-badge variant="default">Paid</app-badge></td>
                    <td class="p-4 align-middle">Credit Card</td>
                    <td class="p-4 align-middle text-right">$250.00</td>
                  </tr>
                  <tr class="border-b hover:bg-muted/50 transition-colors">
                    <td class="p-4 align-middle font-medium">INV002</td>
                    <td class="p-4 align-middle"><app-badge variant="secondary">Pending</app-badge></td>
                    <td class="p-4 align-middle">PayPal</td>
                    <td class="p-4 align-middle text-right">$150.00</td>
                  </tr>
                  <tr class="hover:bg-muted/50 transition-colors">
                    <td class="p-4 align-middle font-medium">INV003</td>
                    <td class="p-4 align-middle"><app-badge variant="destructive">Unpaid</app-badge></td>
                    <td class="p-4 align-middle">Bank Transfer</td>
                    <td class="p-4 align-middle text-right">$350.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </app-card-content>
        </app-card>
      </div>
    </div>
  `
})
export class BadgesComponent {}
