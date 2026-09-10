import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent, CardDescriptionComponent } from '../../shared/components/card/card.component';

@Component({
  selector: 'app-avatars-demo',
  standalone: true,
  imports: [
    CommonModule, 
    CardComponent, CardHeaderComponent, 
    CardTitleComponent, CardContentComponent, CardDescriptionComponent
  ],
  template: `
    <div class="flex-1 space-y-6 pb-8">
      <div>
        <h2 class="text-3xl font-bold tracking-tight">Avatars</h2>
        <p class="text-muted-foreground mt-2">Display user profile images and initials.</p>
      </div>

      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <app-card class="block h-full" className="h-full flex flex-col">
          <app-card-header>
            <app-card-title>Initials & Fallback</app-card-title>
            <app-card-description>Text based avatars.</app-card-description>
          </app-card-header>
          <app-card-content className="flex-1 flex gap-4 items-center">
            <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted font-medium">JD</span>
            <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-medium">SM</span>
            <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground font-medium">AE</span>
          </app-card-content>
        </app-card>

        <app-card class="block h-full" className="h-full flex flex-col">
          <app-card-header>
            <app-card-title>Sizes</app-card-title>
            <app-card-description>Scaling user identities.</app-card-description>
          </app-card-header>
          <app-card-content className="flex-1 flex gap-4 items-end">
            <span class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-muted font-medium text-lg">MD</span>
            <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted font-medium">MD</span>
            <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted font-medium text-xs">MD</span>
          </app-card-content>
        </app-card>
        
        <app-card class="block h-full" className="h-full flex flex-col">
          <app-card-header>
            <app-card-title>Status Indicators</app-card-title>
            <app-card-description>Avatars with presence markers.</app-card-description>
          </app-card-header>
          <app-card-content className="flex-1 flex gap-6 items-center">
            <div class="relative">
              <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted font-medium">ON</span>
              <span class="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-green-500"></span>
            </div>
            <div class="relative">
              <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted font-medium">OFF</span>
              <span class="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-muted-foreground"></span>
            </div>
          </app-card-content>
        </app-card>
      

        <app-card class="block h-full" className="h-full flex flex-col">
          <app-card-header>
            <app-card-title>Image Avatars</app-card-title>
            <app-card-description>Loading high-def portrait photography.</app-card-description>
          </app-card-header>
          <app-card-content className="flex-1 flex gap-4 items-center">
            <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=256&h=256&fit=crop" alt="Avatar" class="h-10 w-10 shrink-0 rounded-full object-cover shadow-sm bg-muted">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=256&h=256&fit=crop" alt="Avatar" class="h-10 w-10 shrink-0 rounded-full object-cover shadow-sm bg-muted">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=256&h=256&fit=crop" alt="Avatar" class="h-10 w-10 shrink-0 rounded-full object-cover shadow-sm ring-2 ring-primary ring-offset-2 ring-offset-background bg-muted">
          </app-card-content>
        </app-card>
        
        <app-card class="block h-full lg:col-span-2" className="h-full flex flex-col">
          <app-card-header>
            <app-card-title>Avatar Groups</app-card-title>
            <app-card-description>Aggregated groupings of shared members overlapping.</app-card-description>
          </app-card-header>
          <app-card-content className="flex-1 flex gap-8 items-center">
            <div class="flex -space-x-4 shrink-0">
              <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=256&h=256&fit=crop" class="w-10 h-10 rounded-full border-2 border-background shadow-sm bg-muted z-40">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=256&h=256&fit=crop" class="w-10 h-10 rounded-full border-2 border-background shadow-sm bg-muted z-30">
              <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=256&h=256&fit=crop" class="w-10 h-10 rounded-full border-2 border-background shadow-sm bg-muted z-20">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=256&h=256&fit=crop" class="w-10 h-10 rounded-full border-2 border-background shadow-sm bg-muted z-10">
              <span class="flex items-center justify-center w-10 h-10 rounded-full border-2 border-background bg-muted text-xs font-medium z-0">+5</span>
            </div>
            
            <div class="flex -space-x-2 shrink-0">
              <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=256&h=256&fit=crop" class="w-8 h-8 rounded-full border-2 border-background shadow-sm bg-muted z-30">
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=256&h=256&fit=crop" class="w-8 h-8 rounded-full border-2 border-background shadow-sm bg-muted z-20">
              <span class="flex items-center justify-center w-8 h-8 rounded-full border-2 border-background bg-primary text-primary-foreground text-[10px] font-medium z-10">+12</span>
            </div>
          </app-card-content>
        </app-card>

      </div>
    </div>
  `
})
export class AvatarsComponent {}
