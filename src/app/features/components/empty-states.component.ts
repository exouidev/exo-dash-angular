import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideDynamicIcon } from '@lucide/angular';
import { CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent, CardDescriptionComponent } from '../../shared/components/card/card.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-empty-states-demo',
  standalone: true,
  imports: [
    CommonModule, LucideDynamicIcon, ButtonComponent,
    CardComponent, CardHeaderComponent, 
    CardTitleComponent, CardContentComponent, CardDescriptionComponent
  ],
  template: `
    <div class="flex-1 space-y-6 pb-8">
      <div>
        <h2 class="text-3xl font-bold tracking-tight">Empty States</h2>
        <p class="text-muted-foreground mt-2">Screens displayed when a list is empty or an error occurs.</p>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        
        <app-card class="block h-full" className="h-full flex flex-col">
          <app-card-header>
            <app-card-title>No Content Found</app-card-title>
            <app-card-description>Standard list empty state.</app-card-description>
          </app-card-header>
          <app-card-content className="flex-1 flex items-center justify-center p-6">
            <div class="flex flex-col items-center text-center space-y-3">
              <div class="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <svg lucideIcon="inbox" class="h-8 w-8 text-muted-foreground"></svg>
              </div>
              <div class="space-y-1">
                <h3 class="font-medium">No messages</h3>
                <p class="text-sm text-muted-foreground max-w-[200px]">You have completely caught up with your inbox.</p>
              </div>
              <app-button variant="outline" size="sm" class="mt-4">Refresh Inbox</app-button>
            </div>
          </app-card-content>
        </app-card>

        <app-card class="block h-full" className="h-full flex flex-col">
          <app-card-header>
            <app-card-title>Call to Action</app-card-title>
            <app-card-description>Prompts user to create initial state.</app-card-description>
          </app-card-header>
          <app-card-content className="flex-1 flex items-center justify-center p-6 border-2 border-dashed border-muted m-6 mt-0 rounded-lg bg-muted/10">
            <div class="flex flex-col items-center text-center space-y-3">
              <div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <svg lucideIcon="folder-plus" class="h-6 w-6 text-primary"></svg>
              </div>
              <div class="space-y-1">
                <h3 class="font-medium text-lg">Create a project</h3>
                <p class="text-sm text-muted-foreground max-w-[250px]">You don't have any projects yet. Create one to get started.</p>
              </div>
              <app-button class="mt-2">New Project</app-button>
            </div>
          </app-card-content>
        </app-card>

      </div>
    </div>
  `
})
export class EmptyStatesDemoComponent {}
