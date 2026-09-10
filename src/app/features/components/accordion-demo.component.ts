import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideDynamicIcon } from '@lucide/angular';
import { CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent, CardDescriptionComponent } from '../../shared/components/card/card.component';

@Component({
  selector: 'app-accordion-demo',
  standalone: true,
  imports: [
    CommonModule, LucideDynamicIcon,
    CardComponent, CardHeaderComponent,
    CardTitleComponent, CardContentComponent, CardDescriptionComponent
  ],
  template: `
    <div class="flex-1 space-y-6 pb-8">
      <div>
        <h2 class="text-3xl font-bold tracking-tight">Accordions</h2>
        <p class="text-muted-foreground mt-2">Vertically-stacked interactive headings revealing deeper content.</p>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <app-card class="block h-full lg:col-span-2" className="h-full flex flex-col">
          <app-card-header>
            <app-card-title>FAQ Layout</app-card-title>
            <app-card-description>Clean expandable details.</app-card-description>
          </app-card-header>
          <app-card-content className="flex-1">
            <div class="w-full max-w-3xl divide-y border-b border-t rounded-md overflow-hidden bg-background">

              <!-- Item 1 -->
              <div class="px-4 py-2 hover:bg-muted/30 transition-colors">
                <button class="flex w-full items-center justify-between font-medium py-3" (click)="toggleAccordion('item1')">
                  Is the layout fully responsive?
                  <svg lucideIcon="chevron-down" class="h-4 w-4 shrink-0 transition-transform duration-200" [class.rotate-180]="expanded() === 'item1'"></svg>
                </button>
                <div [ngClass]="['overflow-hidden text-sm transition-all duration-300 grid', expanded() === 'item1' ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]']">
                  <div class="min-h-0 overflow-hidden">
                    <div class="pb-4 text-muted-foreground leading-relaxed">
                      Absolutely. The grid dynamically flexes between mobile, tablet, and ultra-wide monitor views. All cards handle inner height alignments perfectly.
                    </div>
                  </div>
                </div>
              </div>

              <!-- Item 2 -->
              <div class="px-4 py-2 hover:bg-muted/30 transition-colors">
                <button class="flex w-full items-center justify-between font-medium py-3" (click)="toggleAccordion('item2')">
                  Are the SVGs strictly sized?
                  <svg lucideIcon="chevron-down" class="h-4 w-4 shrink-0 transition-transform duration-200" [class.rotate-180]="expanded() === 'item2'"></svg>
                </button>
                <div [ngClass]="['overflow-hidden text-sm transition-all duration-300 grid', expanded() === 'item2' ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]']">
                  <div class="min-h-0 overflow-hidden">
                    <div class="pb-4 text-muted-foreground leading-relaxed">
                      Yes! Lucide angular icons automatically scale perfectly based on the wrapping <code>h-4 w-4</code> CSS classes passed into them.
                    </div>
                  </div>
                </div>
              </div>

              <!-- Item 3 -->
              <div class="px-4 py-2 hover:bg-muted/30 transition-colors">
                <button class="flex w-full items-center justify-between font-medium py-3" (click)="toggleAccordion('item3')">
                  How does the Dark Mode routing work?
                  <svg lucideIcon="chevron-down" class="h-4 w-4 shrink-0 transition-transform duration-200" [class.rotate-180]="expanded() === 'item3'"></svg>
                </button>
                <div [ngClass]="['overflow-hidden text-sm transition-all duration-300 grid', expanded() === 'item3' ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]']">
                  <div class="min-h-0 overflow-hidden">
                    <div class="pb-4 text-muted-foreground leading-relaxed">
                      ThemeService acts as an Angular signal broadcasting state dynamically to a top-level injected CSS variable system routing perfectly into Tailwind variables.
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </app-card-content>
        </app-card>
      </div>
    </div>
  `
})
export class AccordionDemoComponent {
  expanded = signal<string | null>(null);

  toggleAccordion(item: string) {
    this.expanded.update(current => current === item ? null : item);
  }
}
