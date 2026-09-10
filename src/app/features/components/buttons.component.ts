import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideDynamicIcon } from '@lucide/angular';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent, CardDescriptionComponent } from '../../shared/components/card/card.component';

@Component({
  selector: 'app-buttons-demo',
  standalone: true,
  imports: [
    CommonModule, LucideDynamicIcon,
    ButtonComponent, CardComponent, CardHeaderComponent, 
    CardTitleComponent, CardContentComponent, CardDescriptionComponent
  ],
  template: `
    <div class="flex-1 space-y-6 pb-8">
      <div>
        <h2 class="text-3xl font-bold tracking-tight">Buttons</h2>
        <p class="text-muted-foreground mt-2">Displays a button or a component that looks like a button.</p>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <app-card class="block h-full" className="h-full flex flex-col">
          <app-card-header>
            <app-card-title>Variants</app-card-title>
            <app-card-description>Standard theme variations.</app-card-description>
          </app-card-header>
          <app-card-content className="flex-1 flex flex-wrap gap-4">
            <app-button variant="default">Default</app-button>
            <app-button variant="secondary">Secondary</app-button>
            <app-button variant="destructive">Destructive</app-button>
            <app-button variant="outline">Outline</app-button>
            <app-button variant="ghost">Ghost</app-button>
            <app-button variant="link">Link</app-button>
          </app-card-content>
        </app-card>

        <app-card class="block h-full" className="h-full flex flex-col">
          <app-card-header>
            <app-card-title>Sizes</app-card-title>
            <app-card-description>Button sizing options.</app-card-description>
          </app-card-header>
          <app-card-content className="flex-1 flex flex-wrap gap-4 items-center">
            <app-button variant="default" size="sm">Small</app-button>
            <app-button variant="default" size="default">Default</app-button>
            <app-button variant="default" size="lg">Large</app-button>
            <app-button variant="outline" size="icon">
              <svg lucideIcon="chevron-right" class="h-4 w-4"></svg>
            </app-button>
          </app-card-content>
        </app-card>

        <app-card class="block h-full" className="h-full flex flex-col">
          <app-card-header>
            <app-card-title>With Icons</app-card-title>
            <app-card-description>Combining icons and text.</app-card-description>
          </app-card-header>
          <app-card-content className="flex-1 flex flex-wrap gap-4 items-center">
            <app-button variant="default">
              <svg lucideIcon="mail" class="mr-2 h-4 w-4"></svg> Login with Email
            </app-button>
            <app-button variant="secondary">
              Deploy <svg lucideIcon="upload" class="ml-2 h-4 w-4"></svg>
            </app-button>
            <app-button variant="destructive">
              <svg lucideIcon="trash" class="mr-2 h-4 w-4"></svg> Delete Project
            </app-button>
          </app-card-content>
        </app-card>

        <app-card class="block h-full" className="h-full flex flex-col">
          <app-card-header>
            <app-card-title>Loading State</app-card-title>
            <app-card-description>Async operation visualization.</app-card-description>
          </app-card-header>
          <app-card-content className="flex-1 flex flex-wrap gap-4 items-center">
            <app-button [disabled]="true">
              <svg lucideIcon="loader-2" class="mr-2 h-4 w-4 animate-spin"></svg> Please wait
            </app-button>
            <app-button variant="outline" [disabled]="true">
              <svg lucideIcon="loader-2" class="h-4 w-4 animate-spin"></svg>
            </app-button>
          </app-card-content>
        </app-card>
      </div>
    </div>
  `
})
export class ButtonsComponent {}
