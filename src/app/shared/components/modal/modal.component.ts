import { Component, input, output, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideDynamicIcon } from '@lucide/angular';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, LucideDynamicIcon],
  template: `
    @if (isOpen()) {
      <!-- Backdrop -->
      <div 
        class="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm transition-all"
        (click)="closeOnBackdropClick() ? closeModal() : null"
      ></div>

      <!-- Modal panel -->
      <div class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
        <div 
          class="bg-background border shadow-lg sm:rounded-lg w-full max-w-lg flex flex-col gap-4 p-6 animate-in fade-in zoom-in-95 duration-200 pointer-events-auto"
          (click)="$event.stopPropagation()"
        >
          <!-- Header -->
          <div class="flex flex-col space-y-1.5 text-center sm:text-left">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold leading-none tracking-tight">
                {{ title() }}
              </h2>
              @if (showCloseButton()) {
                <button 
                  class="h-8 w-8 inline-flex items-center justify-center rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                  (click)="closeModal()"
                >
                  <svg lucideIcon="x" class="h-4 w-4"></svg>
                  <span class="sr-only">Close</span>
                </button>
              }
            </div>
            @if (description()) {
              <p class="text-sm text-muted-foreground">
                {{ description() }}
              </p>
            }
          </div>

          <!-- Content -->
          <div class="py-4">
            <ng-content></ng-content>
          </div>

          <!-- Footer -->
          <div class="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <ng-content select="[modal-footer]"></ng-content>
          </div>
        </div>
      </div>
    }
  `
})
export class ModalComponent {
  isOpen = input<boolean>(false);
  title = input<string>('');
  description = input<string>('');
  showCloseButton = input<boolean>(true);
  closeOnBackdropClick = input<boolean>(true);

  close = output<void>();

  closeModal() {
    this.close.emit();
  }
}
