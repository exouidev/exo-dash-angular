import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideDynamicIcon } from '@lucide/angular';
import { ThemeService } from '../../core/services/theme.service';

interface ProFeature {
  name: string;
  imageDark: string;
  imageLight: string;
}

@Component({
  selector: 'app-pro-components',
  standalone: true,
  imports: [CommonModule, LucideDynamicIcon],
  template: `
    <div class="px-4 py-8 mx-auto xl:px-8">
      <div class="mb-8 text-center mt-4">
        <h1 class="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Pro Features</h1>
        <p class="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Unlock the full potential of your application with our premium components and pages.
          Discover what's available in the Pro version.
        </p>
        <div class="mt-6 mx-auto flex justify-center">
          <a href="https://exoui.dev" target="_blank" rel="noopener noreferrer" 
             class="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow hover:bg-primary/90 transition-colors">
            Get Pro Now
            <svg lucideIcon="external-link" class="h-4 w-4"></svg>
          </a>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
        @for (feature of features; track feature.name) {
          <div class="group relative overflow-hidden rounded-xl border border-border bg-card p-2 shadow-sm transition-all hover:shadow-md">
            <a href="https://exoui.dev" target="_blank" rel="noopener noreferrer" class="block">
              <div class="mb-4">
                <h3 class="text-lg font-semibold text-card-foreground px-2 pt-2">{{ feature.name }}</h3>
              </div>
              <div class="relative aspect-[16/10] overflow-hidden rounded-lg bg-muted border border-border">
                <img [src]="'/screenshots/' + feature.imageLight" [alt]="feature.name + ' Light'" 
                     class="absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-300 ease-in-out"
                     [class.opacity-0]="themeService.currentTheme() === 'dark'"
                     [class.opacity-100]="themeService.currentTheme() === 'light'" />
                <img [src]="'/screenshots/' + feature.imageDark" [alt]="feature.name + ' Dark'" 
                     class="absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-300 ease-in-out"
                     [class.opacity-0]="themeService.currentTheme() === 'light'"
                     [class.opacity-100]="themeService.currentTheme() === 'dark'" />
              </div>
              <div class="absolute inset-0 bg-background/0 transition-colors group-hover:bg-background/10 rounded-xl rounded-t-none mt-[4.5rem]"></div>
              
              <div class="absolute inset-x-0 bottom-0 top-[4.5rem] flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                <span class="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg backdrop-blur-sm flex items-center gap-2">
                  View on ExoUI
                  <svg lucideIcon="external-link" class="h-3 w-3"></svg>
                </span>
              </div>
            </a>
          </div>
        }
      </div>
    </div>
  `
})
export class ProComponentsComponent {
  themeService = inject(ThemeService);

  features: ProFeature[] = [
    { name: 'Analytics Dashboard', imageDark: 'analytics-dark.jpg', imageLight: 'analytics-light.jpg' },
    { name: 'SaaS Dashboard', imageDark: 'saas-dark.jpg', imageLight: 'saas-light.jpg' },
    { name: 'Finance Dashboard', imageDark: 'finance-dark.jpg', imageLight: 'finance-light.jpg' },
    { name: 'File Manager', imageDark: 'file-manager-dark.jpg', imageLight: 'file-manager-light.jpg' },
    { name: 'Kanban Board', imageDark: 'kanban-dark.jpg', imageLight: 'kanban-light.jpg' },
    { name: 'Calendar', imageDark: 'calendar-dark.jpg', imageLight: 'calendar-light.jpg' },
    { name: 'Tickets', imageDark: 'tickets-dark.jpg', imageLight: 'tickets-light.jpg' },
    { name: 'Email', imageDark: 'email-dark.jpg', imageLight: 'email-light.jpg' },
    { name: 'Chat', imageDark: 'chat-dark.jpg', imageLight: 'chat-light.jpg' },
    { name: 'To-Do List', imageDark: 'to-do-dark.jpg', imageLight: 'to-do-light.jpg' }
  ];
}
