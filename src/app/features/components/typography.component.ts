import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent, CardDescriptionComponent } from '../../shared/components/card/card.component';

@Component({
  selector: 'app-typography-demo',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent, CardHeaderComponent, 
    CardTitleComponent, CardContentComponent, CardDescriptionComponent
  ],
  template: `
    <div class="flex-1 space-y-6 pb-8">
      <div>
        <h2 class="text-3xl font-bold tracking-tight">Typography</h2>
        <p class="text-muted-foreground mt-2">Styles for headings, paragraphs, lists, and more.</p>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <app-card class="block h-full" className="h-full flex flex-col">
          <app-card-header>
            <app-card-title>Headings</app-card-title>
            <app-card-description>Hierarchical typography.</app-card-description>
          </app-card-header>
          <app-card-content className="flex-1 space-y-4">
            <div><h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Heading 1</h1></div>
            <div><h2 class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">Heading 2</h2></div>
            <div><h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">Heading 3</h3></div>
            <div><h4 class="scroll-m-20 text-xl font-semibold tracking-tight">Heading 4</h4></div>
          </app-card-content>
        </app-card>

        <app-card class="block h-full" className="h-full flex flex-col">
          <app-card-header>
            <app-card-title>Text Elements</app-card-title>
            <app-card-description>Paragraphs, muted text, and blockquotes.</app-card-description>
          </app-card-header>
          <app-card-content className="flex-1 space-y-4">
            <p class="leading-7">
              The king, seeing how much Missormer loved the little pig, called him and said: "A pig is no fit pet for a princess."
            </p>
            <p class="text-sm font-medium leading-none">Small bold text</p>
            <p class="text-sm text-muted-foreground">Muted text representation.</p>
            <blockquote class="mt-6 border-l-2 pl-6 italic">
              "After all," he said, "everyone enjoys a good joke."
            </blockquote>
          </app-card-content>
        </app-card>
      </div>
    </div>
  `
})
export class TypographyComponent {}
