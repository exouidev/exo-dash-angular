import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideDynamicIcon } from '@lucide/angular';
import { CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent, CardDescriptionComponent } from '../../shared/components/card/card.component';

@Component({
  selector: 'app-progress-demo',
  standalone: true,
  imports: [
    CommonModule, LucideDynamicIcon, 
    CardComponent, CardHeaderComponent, 
    CardTitleComponent, CardContentComponent, CardDescriptionComponent
  ],
  template: `
    <div class="flex-1 space-y-6 pb-8">
      <div>
        <h2 class="text-3xl font-bold tracking-tight">Progress & Loading</h2>
        <p class="text-muted-foreground mt-2">Display indicators for underlying asynchronous tasks.</p>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <app-card class="block h-full" className="h-full flex flex-col">
          <app-card-header>
            <app-card-title>Progress Bars</app-card-title>
            <app-card-description>Linear completion tracking.</app-card-description>
          </app-card-header>
          <app-card-content className="flex-1 space-y-6">
            <div>
              <div class="mb-2 flex items-center justify-between text-sm">
                <span class="font-medium">File Upload</span>
                <span class="text-muted-foreground">33%</span>
              </div>
              <div class="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
                <div class="h-full w-[33%] bg-primary transition-all duration-500"></div>
              </div>
            </div>
            
            <div>
              <div class="mb-2 flex items-center justify-between text-sm">
                <span class="font-medium">System Update</span>
                <span class="text-muted-foreground">87%</span>
              </div>
              <div class="relative h-4 w-full overflow-hidden rounded-full bg-primary/20">
                <div class="h-full w-[87%] bg-primary transition-all duration-500"></div>
              </div>
            </div>
          </app-card-content>
        </app-card>

        <app-card class="block h-full" className="h-full flex flex-col">
          <app-card-header>
            <app-card-title>Spinners</app-card-title>
            <app-card-description>Indeterminate loading animations.</app-card-description>
          </app-card-header>
          <app-card-content className="flex-1">
            <div class="grid grid-cols-3 gap-4">
              <div class="flex h-24 items-center justify-center rounded-lg border bg-card">
                <svg lucideIcon="loader-2" class="h-8 w-8 animate-spin text-primary"></svg>
              </div>
              
              <div class="flex h-24 items-center justify-center rounded-lg border bg-card">
                <svg lucideIcon="refresh-ccw" class="h-6 w-6 animate-spin text-muted-foreground"></svg>
              </div>
              
              <div class="flex h-24 items-center justify-center rounded-lg border bg-card">
                <div class="flex items-center space-x-2">
                   <div class="h-3 w-3 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]"></div>
                   <div class="h-3 w-3 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]"></div>
                   <div class="h-3 w-3 animate-bounce rounded-full bg-primary"></div>
                </div>
              </div>
            </div>
          </app-card-content>
        </app-card>
      </div>
    </div>
  `
})
export class ProgressComponent {}
