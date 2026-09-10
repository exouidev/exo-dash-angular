import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideDynamicIcon } from '@lucide/angular';
import { CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent, CardDescriptionComponent } from '../../shared/components/card/card.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-alerts-demo',
  standalone: true,
  imports: [
    CommonModule, LucideDynamicIcon,
    ButtonComponent,
    CardComponent, CardHeaderComponent, 
    CardTitleComponent, CardContentComponent, CardDescriptionComponent
  ],
  template: `
    <div class="flex-1 space-y-6 pb-8">
      <div>
        <h2 class="text-3xl font-bold tracking-tight">Alerts</h2>
        <p class="text-muted-foreground mt-2">Display a callout for user attention.</p>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <app-card class="block h-full" className="h-full flex flex-col">
          <app-card-header>
            <app-card-title>Default Style</app-card-title>
            <app-card-description>A standard alert component.</app-card-description>
          </app-card-header>
          <app-card-content className="flex-1 space-y-4">
            <div class="relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:text-foreground [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&:has(svg)]:pl-11">
              <svg lucideIcon="terminal" class="h-4 w-4"></svg>
              <h5 class="mb-1 font-medium leading-none tracking-tight">CLI Engine Started</h5>
              <div class="text-sm [&_p]:leading-relaxed text-muted-foreground">
                You can now interface using standard terminal commands.
              </div>
            </div>
          </app-card-content>
        </app-card>

        <app-card class="block h-full" className="h-full flex flex-col">
          <app-card-header>
            <app-card-title>Destructive</app-card-title>
            <app-card-description>Alerts indicating a failure or danger.</app-card-description>
          </app-card-header>
          <app-card-content className="flex-1 space-y-4">
            <div class="relative w-full rounded-lg border border-destructive/50 text-destructive dark:border-destructive p-4 [&>svg]:absolute [&>svg]:text-destructive [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&:has(svg)]:pl-11">
              <svg lucideIcon="alert-circle" class="h-4 w-4"></svg>
              <h5 class="mb-1 font-medium leading-none tracking-tight">Error Parsing Data</h5>
              <div class="text-sm [&_p]:leading-relaxed text-destructive/90">
                Your session has expired. Please log in again to continue this operation.
              </div>
            </div>
          </app-card-content>
        </app-card>

        <app-card class="block h-full" className="h-full flex flex-col">
          <app-card-header>
            <app-card-title>Inline Actions</app-card-title>
            <app-card-description>Alert blocks containing structural workflows.</app-card-description>
          </app-card-header>
          <app-card-content className="flex-1 space-y-4">
            <div class="relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:text-primary [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&:has(svg)]:pl-11 border-primary/20 bg-primary/5">
              <svg lucideIcon="rocket" class="h-4 w-4"></svg>
              <h5 class="mb-1 font-medium leading-none tracking-tight text-primary">New features available</h5>
              <div class="text-sm [&_p]:leading-relaxed text-muted-foreground mt-2">
                We've significantly upgraded the dashboard engine. Check out the release notes to see what's new.
              </div>
              <div class="mt-4 flex gap-2">
                <app-button size="sm">Read Notes</app-button>
                <app-button variant="outline" size="sm">Dismiss</app-button>
              </div>
            </div>
          </app-card-content>
        </app-card>
        
        <app-card class="block h-full" className="h-full flex flex-col">
          <app-card-header>
            <app-card-title>Success</app-card-title>
            <app-card-description>Favorable process confirmations.</app-card-description>
          </app-card-header>
          <app-card-content className="flex-1 space-y-4">
            <div class="relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:text-green-600 [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&:has(svg)]:pl-11 border-green-600/20 bg-green-500/10 dark:bg-green-500/5">
              <svg lucideIcon="check-circle-2" class="h-4 w-4"></svg>
              <h5 class="mb-1 font-medium leading-none tracking-tight text-green-700 dark:text-green-500">Operation Successful</h5>
              <div class="text-sm [&_p]:leading-relaxed text-green-600 dark:text-green-400 mt-2">
                The database migration completed accurately with exactly 0 dropped packets.
              </div>
            </div>
          </app-card-content>
        </app-card>
      </div>
    </div>
  `
})
export class AlertsComponent {}
