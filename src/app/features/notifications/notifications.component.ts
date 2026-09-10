import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent, CardDescriptionComponent } from '../../shared/components/card/card.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ToastService } from '../../shared/components/toast/toast.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    CommonModule, 
    CardComponent, 
    CardHeaderComponent, 
    CardTitleComponent, 
    CardContentComponent,
    CardDescriptionComponent,
    ButtonComponent
  ],
  template: `
    <div class="flex-1 space-y-4 pb-8">
      
      <div class="flex items-center justify-between space-y-2">
        <h2 class="text-3xl font-bold tracking-tight">Notifications & Toast Hub</h2>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        
        <!-- Toast Generators -->
        <app-card>
          <app-card-header>
            <app-card-title>Toast Playground</app-card-title>
            <app-card-description>Click buttons below to trigger application-wide toast notifications.</app-card-description>
          </app-card-header>
          <app-card-content class="space-y-6">
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Default Toast -->
              <div class="flex flex-col gap-2 p-4 border rounded-lg bg-card overflow-hidden">
                <span class="font-medium text-sm">Default</span>
                <span class="text-xs text-muted-foreground mb-2">Standard informational popup.</span>
                <app-button variant="outline" class="w-full block" className="w-full" (click)="toast.default('Scheduled: Catch up', 'Friday, February 10, 2026 at 5:57 PM')">
                  Show Default
                </app-button>
              </div>

              <!-- Success Toast -->
              <div class="flex flex-col gap-2 p-4 border rounded-lg bg-card overflow-hidden">
                <span class="font-medium text-sm text-green-600 dark:text-green-500">Success</span>
                <span class="text-xs text-muted-foreground mb-2">Confirm positive actions.</span>
                <app-button variant="outline-success" class="w-full block" className="w-full" (click)="toast.success('Invoice Paid', 'You successfully paid the invoice for $45.00')">
                  Show Success
                </app-button>
              </div>
              
              <!-- Info Toast -->
              <div class="flex flex-col gap-2 p-4 border rounded-lg bg-card overflow-hidden">
                <span class="font-medium text-sm text-blue-600 dark:text-blue-500">Information</span>
                <span class="text-xs text-muted-foreground mb-2">Important neutral updates.</span>
                <app-button variant="outline-info" class="w-full block" className="w-full" (click)="toast.info('Update Available', 'A new version of the dashboard is ready to install.')">
                  Show Info
                </app-button>
              </div>

              <!-- Warning Toast -->
              <div class="flex flex-col gap-2 p-4 border rounded-lg bg-card overflow-hidden">
                <span class="font-medium text-sm text-amber-600 dark:text-amber-500">Warning</span>
                <span class="text-xs text-muted-foreground mb-2">Cautionary system states.</span>
                <app-button variant="outline-warning" class="w-full block" className="w-full" (click)="toast.warning('Storage Approaching Limit', 'You have used 90% of your allocated 50GB storage.')">
                  Show Warning
                </app-button>
              </div>

              <!-- Destructive Toast -->
              <div class="flex flex-col gap-2 p-4 border md:col-span-2 rounded-lg bg-card overflow-hidden">
                <span class="font-medium text-sm text-destructive">Destructive / Error</span>
                <span class="text-xs text-muted-foreground mb-2">Critical errors or destructive actions. Displays longer (5 seconds).</span>
                <app-button variant="destructive" class="w-full block" className="w-full" (click)="toast.error('Uh oh! Something went wrong.', 'There was a problem with your request. Please try again.')">
                  Show Error Toast
                </app-button>
              </div>
              
            </div>

          </app-card-content>
        </app-card>

        <!-- Notification Feed Example -->
        <app-card>
          <app-card-header>
            <app-card-title>Recent Activity Feed</app-card-title>
            <app-card-description>System notifications are logged here.</app-card-description>
          </app-card-header>
          <app-card-content>
            <div class="space-y-6">
              
              @for (notification of mockNotifications; track notification.id) {
                <div class="flex items-start gap-4">
                  <div 
                    class="mt-1 flex h-2 w-2 shrink-0 rounded-full"
                    [ngClass]="{
                      'bg-blue-500': notification.type === 'primary',
                      'bg-green-500': notification.type === 'success',
                      'bg-destructive': notification.type === 'danger',
                      'bg-muted-foreground': notification.type === 'neutral'
                    }"
                  ></div>
                  <div class="grid gap-1 min-w-0">
                    <p class="text-sm font-medium leading-none truncate">{{ notification.title }}</p>
                    <p class="text-sm text-muted-foreground">{{ notification.description }}</p>
                    <p class="text-xs text-muted-foreground/70">{{ notification.time }}</p>
                  </div>
                </div>
              }

            </div>
            
            <app-button variant="outline" class="block w-full" className="w-full mt-6">View All Notifications</app-button>
          </app-card-content>
        </app-card>

      </div>
    </div>
  `
})
export class NotificationsComponent {
  toast = inject(ToastService);

  mockNotifications = [
    { id: 1, title: 'Your call has been confirmed.', description: 'Meeting with the design team.', time: '1 hour ago', type: 'primary' },
    { id: 2, title: 'You have a new message!', description: 'Sarah sent you a direct message.', time: '2 hours ago', type: 'success' },
    { id: 3, title: 'Payment failed.', description: 'Your subscription could not be renewed.', time: 'Yesterday', type: 'danger' },
    { id: 4, title: 'New device logged in.', description: 'San Francisco, CA - Chrome on MacOS.', time: 'Yesterday', type: 'neutral' },
    { id: 5, title: 'Weekly report ready.', description: 'Your Q3 analytics are prepared.', time: 'Oct 14, 2026', type: 'neutral' },
  ];
}
