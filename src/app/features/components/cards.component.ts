import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideDynamicIcon } from '@lucide/angular';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent, CardDescriptionComponent } from '../../shared/components/card/card.component';
import { BadgeComponent } from '../../shared/components/badge/badge.component';

@Component({
  selector: 'app-cards-demo',
  standalone: true,
  imports: [
    CommonModule, LucideDynamicIcon,
    ButtonComponent, BadgeComponent,
    CardComponent, CardHeaderComponent, 
    CardTitleComponent, CardContentComponent, CardDescriptionComponent
  ],
  template: `
    <div class="flex-1 space-y-6 pb-8">
      <div>
        <h2 class="text-3xl font-bold tracking-tight">Cards</h2>
        <p class="text-muted-foreground mt-2">Surface elements containing distinct groupings of related information.</p>
      </div>

      
      <div class="space-y-8">
        
        <!-- Standard Interactive Cards -->
        <div>
          <h3 class="font-medium text-muted-foreground mb-4">Standard Layouts</h3>
          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <!-- Create Project Card -->
            <app-card class="block h-full" className="h-full flex flex-col">
              <app-card-header>
                <app-card-title>Create project</app-card-title>
                <app-card-description>Deploy your new project in one-click.</app-card-description>
              </app-card-header>
              <app-card-content className="flex-1">
                <form class="space-y-4">
                  <div class="flex flex-col space-y-1.5">
                    <label class="text-sm font-medium leading-none" for="name">Name</label>
                    <input id="name" class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" placeholder="Name of your project">
                  </div>
                </form>
              </app-card-content>
              <div class="flex items-center p-6 pt-0 justify-between">
                <app-button variant="outline">Cancel</app-button>
                <app-button>Deploy</app-button>
              </div>
            </app-card>

            <!-- Interactive Notification -->
            <app-card class="block h-full" className="h-full flex flex-col">
              <app-card-header>
                <app-card-title>Notifications</app-card-title>
                <app-card-description>You have 3 unread messages.</app-card-description>
              </app-card-header>
              <app-card-content className="flex-1 grid gap-4">
                <div class="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                  <span class="flex h-2 w-2 translate-y-1 rounded-full bg-primary"></span>
                  <div class="space-y-1">
                    <p class="text-sm font-medium leading-none">Your call has been confirmed.</p>
                    <p class="text-sm text-muted-foreground">1 hour ago</p>
                  </div>
                </div>
                <div class="grid grid-cols-[25px_1fr] items-start">
                  <span class="flex h-2 w-2 translate-y-1 rounded-full bg-primary"></span>
                  <div class="space-y-1">
                    <p class="text-sm font-medium leading-none">You have a new message!</p>
                    <p class="text-sm text-muted-foreground">1 hour ago</p>
                  </div>
                </div>
              </app-card-content>
            </app-card>

            <!-- Horizontal Profile Card -->
            <app-card class="block h-full md:col-span-2 lg:col-span-1" className="h-full flex flex-col justify-center">
              <app-card-content className="flex items-center space-x-4 pt-6 shrink-0">
                <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=256&h=256&fit=crop" class="w-16 h-16 shrink-0 rounded-full object-cover">
                <div class="flex-1 space-y-1 overflow-hidden">
                  <h3 class="font-medium text-lg leading-none truncate">Alex Thompson</h3>
                  <p class="text-sm text-muted-foreground truncate">Sr. Backend Engineer</p>
                </div>
                <app-button variant="outline" size="sm" class="shrink-0">Message</app-button>
              </app-card-content>
            </app-card>
            
          </div>
        </div>
        
        <!-- Media Rich Cards -->
        <div>
          <h3 class="font-medium text-muted-foreground mb-4">Media & Presentation</h3>
          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <!-- Product Card -->
            <app-card class="block h-full" className="h-full flex flex-col">
              <div class="w-full aspect-video p-0 overflow-hidden rounded-t-xl mb-4 border-b">
                 <img src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&h=400&fit=crop" class="w-full h-full object-cover">
              </div>
              <app-card-header className="pt-0">
                <div class="flex items-center justify-between">
                  <app-card-title>Analog Camera</app-card-title>
                  <app-badge variant="secondary">$249</app-badge>
                </div>
                <app-card-description>Premium vintage photography</app-card-description>
              </app-card-header>
              <app-card-content className="flex-1">
                <p class="text-sm text-muted-foreground">Free shipping on all orders over $100. Delivered in 2-3 business days.</p>
              </app-card-content>
              <div class="p-6 pt-0">
                <app-button class="w-full">
                  <svg lucideIcon="shopping-cart" class="mr-2 h-4 w-4"></svg> Add to Cart
                </app-button>
              </div>
            </app-card>

            <!-- Media / Article Card -->
            <app-card class="block h-full" className="h-full flex flex-col overflow-hidden">
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop" alt="Workspace" class="w-full h-48 object-cover border-b rounded-t-xl">
              <app-card-header>
                <app-card-title>Building Modern Workspaces</app-card-title>
                <app-card-description>Oct 24, 2023 • Architecture</app-card-description>
              </app-card-header>
              <app-card-content className="flex-1">
                <p class="text-sm text-muted-foreground line-clamp-3">Designing open-plan office spaces that both foster collaboration and provide necessary acoustic isolation for deep work sessions.</p>
              </app-card-content>
              <div class="p-6 pt-0">
                 <app-button variant="link" class="px-0">Read Article <svg lucideIcon="chevron-right" class="h-4 w-4 ml-1"></svg></app-button>
              </div>
            </app-card>

            <!-- Pricing Card -->
            <app-card class="block h-full md:col-span-2 lg:col-span-1" className="h-full flex flex-col border-primary/20 bg-primary/5">
              <app-card-header>
                <app-card-title class="text-xl">Pro Plan</app-card-title>
                <app-card-description>For growing teams.</app-card-description>
                <div class="mt-4 flex items-baseline text-4xl font-extrabold">
                  $49
                  <span class="ml-1 text-xl font-medium text-muted-foreground">/mo</span>
                </div>
              </app-card-header>
              <app-card-content className="flex-1">
                <ul class="space-y-3 text-sm">
                  <li class="flex items-center"><svg lucideIcon="check" class="h-4 w-4 mr-2 text-primary"></svg> Unlimited Projects</li>
                  <li class="flex items-center"><svg lucideIcon="check" class="h-4 w-4 mr-2 text-primary"></svg> 50GB Cloud Storage</li>
                  <li class="flex items-center"><svg lucideIcon="check" class="h-4 w-4 mr-2 text-primary"></svg> Priority Support</li>
                  <li class="flex items-center"><svg lucideIcon="check" class="h-4 w-4 mr-2 text-primary"></svg> Custom Domains</li>
                </ul>
              </app-card-content>
              <div class="p-6 pt-0 mt-auto">
                <app-button class="w-full">Upgrade to Pro</app-button>
              </div>
            </app-card>
          </div>
        </div>

        <!-- Metric KPI Cards (Small) -->
        <div>
          <h3 class="font-medium text-muted-foreground mb-4">Metric Snapshots</h3>
          <div class="grid gap-6 md:grid-cols-3">
            <app-card class="block h-full" className="h-full flex flex-col justify-center">
              <app-card-header class="flex flex-row items-center justify-between space-y-0 pb-2">
                <app-card-title class="text-sm font-medium">Total Revenue</app-card-title>
                <svg lucideIcon="dollar-sign" class="h-4 w-4 text-muted-foreground"></svg>
              </app-card-header>
              <app-card-content>
                <div class="text-2xl font-bold">$45,231.89</div>
                <p class="text-xs text-muted-foreground mt-1">+20.1% from last month</p>
              </app-card-content>
            </app-card>
            <app-card class="block h-full" className="h-full flex flex-col justify-center">
              <app-card-header class="flex flex-row items-center justify-between space-y-0 pb-2">
                <app-card-title class="text-sm font-medium">Active Subscriptions</app-card-title>
                <svg lucideIcon="users" class="h-4 w-4 text-muted-foreground"></svg>
              </app-card-header>
              <app-card-content>
                <div class="text-2xl font-bold">+2350</div>
                <p class="text-xs text-muted-foreground mt-1">+180.1% from last month</p>
              </app-card-content>
            </app-card>
            <app-card class="block h-full" className="h-full flex flex-col justify-center">
              <app-card-header class="flex flex-row items-center justify-between space-y-0 pb-2">
                <app-card-title class="text-sm font-medium">Sales Count</app-card-title>
                <svg lucideIcon="credit-card" class="h-4 w-4 text-muted-foreground"></svg>
              </app-card-header>
              <app-card-content>
                <div class="text-2xl font-bold">+12,234</div>
                <p class="text-xs text-muted-foreground mt-1">+19% from last month</p>
              </app-card-content>
            </app-card>
          </div>
        </div>

      </div>
    </div>
  `
})

export class CardsComponent {}
