import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  host: { class: 'block' },
  standalone: true,
  template: `
    <div [class]="'rounded-xl border bg-card text-card-foreground shadow ' + className()">
      <ng-content></ng-content>
    </div>
  `
})
export class CardComponent {
  className = input<string>('');
}

@Component({
  selector: 'app-card-header',
  host: { class: 'block' },
  standalone: true,
  template: `
    <div [class]="'flex flex-col space-y-1.5 p-6 ' + className()">
      <ng-content></ng-content>
    </div>
  `
})
export class CardHeaderComponent {
  className = input<string>('');
}

@Component({
  selector: 'app-card-title',
  host: { class: 'block' },
  standalone: true,
  template: `
    <h3 [class]="'font-semibold leading-none tracking-tight ' + className()">
      <ng-content></ng-content>
    </h3>
  `
})
export class CardTitleComponent {
  className = input<string>('');
}

@Component({
  selector: 'app-card-content',
  host: { class: 'block' },
  standalone: true,
  template: `
    <div [class]="'p-6 pt-0 ' + className()">
      <ng-content></ng-content>
    </div>
  `
})
export class CardContentComponent {
  className = input<string>('');
}

@Component({
  selector: 'app-card-description',
  host: { class: 'block' },
  standalone: true,
  template: `
    <p [class]="'text-sm text-muted-foreground ' + className()">
      <ng-content></ng-content>
    </p>
  `
})
export class CardDescriptionComponent {
  className = input<string>('');
}
