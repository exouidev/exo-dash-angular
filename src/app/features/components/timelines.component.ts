import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideDynamicIcon } from '@lucide/angular';
import { CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent, CardDescriptionComponent } from '../../shared/components/card/card.component';

@Component({
  selector: 'app-timelines-demo',
  standalone: true,
  imports: [
    CommonModule, LucideDynamicIcon,
    CardComponent, CardHeaderComponent, 
    CardTitleComponent, CardContentComponent, CardDescriptionComponent
  ],
  template: `
    <div class="flex-1 space-y-6 pb-8">
      <div>
        <h2 class="text-3xl font-bold tracking-tight">Timelines & Feeds</h2>
        <p class="text-muted-foreground mt-2">Vertical list of sequential events or history tracking.</p>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <app-card class="block h-full" className="h-full flex flex-col">
          <app-card-header>
            <app-card-title>Activity Feed</app-card-title>
            <app-card-description>Tracking team interaction history.</app-card-description>
          </app-card-header>
          <app-card-content className="flex-1">
            <div class="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-muted before:to-transparent">
              
              <!-- Item 1 -->
              <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div class="flex items-center justify-center w-10 h-10 rounded-full border border-background bg-primary text-primary-foreground shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                  <svg lucideIcon="check" class="h-4 w-4"></svg>
                </div>
                <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border bg-card shadow-sm">
                  <div class="flex items-center justify-between space-x-2 mb-1">
                    <div class="font-medium text-sm">Deployment Successful</div>
                    <time class="text-xs text-muted-foreground font-medium">10:24 AM</time>
                  </div>
                  <div class="text-sm text-muted-foreground">Version 2.3.1 shipped to production servers smoothly.</div>
                </div>
              </div>
              
              <!-- Item 2 -->
              <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div class="flex items-center justify-center w-10 h-10 rounded-full border border-background bg-muted text-muted-foreground shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                  <svg lucideIcon="git-commit" class="h-4 w-4"></svg>
                </div>
                <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border bg-card shadow-sm">
                  <div class="flex items-center justify-between space-x-2 mb-1">
                    <div class="font-medium text-sm">Pull Request Merged</div>
                    <time class="text-xs text-muted-foreground font-medium">9:12 AM</time>
                  </div>
                  <div class="text-sm text-muted-foreground">Sarah merged 12 commits into main branch.</div>
                </div>
              </div>

              <!-- Item 3 -->
              <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div class="flex items-center justify-center w-10 h-10 rounded-full border border-background bg-destructive/10 text-destructive shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                  <svg lucideIcon="x" class="h-4 w-4"></svg>
                </div>
                <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-destructive/20 bg-card shadow-sm">
                  <div class="flex items-center justify-between space-x-2 mb-1">
                    <div class="font-medium text-sm text-destructive">Build Failed</div>
                    <time class="text-xs text-muted-foreground font-medium">Yesterday</time>
                  </div>
                  <div class="text-sm text-muted-foreground">CI pipeline failed during integration tests.</div>
                </div>
              </div>

            </div>
          </app-card-content>
        </app-card>

        <app-card class="block h-full" className="h-full flex flex-col">
          <app-card-header>
            <app-card-title>Simple Steps</app-card-title>
            <app-card-description>Ordered visual steps layout.</app-card-description>
          </app-card-header>
          <app-card-content className="flex-1 pt-6">
            <ol class="relative border-l border-muted ml-3">                  
                <li class="mb-10 pl-6">            
                    <span class="absolute flex items-center justify-center w-6 h-6 bg-primary rounded-full -left-3 ring-4 ring-background">
                        <svg lucideIcon="check" class="w-3 h-3 text-primary-foreground"></svg>
                    </span>
                    <h3 class="font-medium leading-tight">Personal Info</h3>
                    <p class="text-sm text-muted-foreground mt-1">Provide your initial registration details.</p>
                </li>
                <li class="mb-10 pl-6">
                    <span class="absolute flex items-center justify-center w-6 h-6 bg-primary rounded-full -left-3 ring-4 ring-background">
                        <span class="text-xs text-primary-foreground font-medium">2</span>
                    </span>
                    <h3 class="font-medium leading-tight">Account Setup</h3>
                    <p class="text-sm text-muted-foreground mt-1">Link your active enterprise environment endpoints.</p>
                </li>
                <li class="pl-6">
                    <span class="absolute flex items-center justify-center w-6 h-6 bg-muted rounded-full -left-3 ring-4 ring-background">
                        <span class="text-xs text-muted-foreground font-medium">3</span>
                    </span>
                    <h3 class="font-medium leading-tight text-muted-foreground">Review</h3>
                    <p class="text-sm text-muted-foreground mt-1">Final confirmation of account boundaries.</p>
                </li>
            </ol>
          </app-card-content>
        </app-card>
      </div>
    </div>
  `
})
export class TimelinesDemoComponent {}
