import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideDynamicIcon } from '@lucide/angular';
import { CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent } from '../../shared/components/card/card.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideDynamicIcon, CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent, ButtonComponent],
  template: `
    <app-card class="block w-full" className="border-0 shadow-none bg-transparent">
      <app-card-header class="space-y-1 text-center">
        <div class="flex justify-center mb-2">
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <svg lucideIcon="key-round" class="h-5 w-5 text-primary"></svg>
          </div>
        </div>
        <app-card-title class="text-2xl font-bold tracking-tight">Forgot Password</app-card-title>
        <p class="text-sm text-muted-foreground">Enter your email and we'll send you a reset link</p>
      </app-card-header>
      <app-card-content>
        @if (isSubmitted()) {
          <div class="rounded-md bg-muted p-4 text-sm text-foreground mb-4 border border-border flex items-center justify-center font-medium text-center">
            <svg lucideIcon="check-circle" class="h-4 w-4 mr-2 text-green-600"></svg> Check your email for a reset link.
          </div>
          <app-button class="block w-full" className="w-full" routerLink="/auth/login">Back to Login</app-button>
        } @else {
          <form (submit)="onSubmit($event)" class="space-y-4">
            <div class="space-y-2">
              <label for="email" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
              <input
                id="email"
                type="email"
                placeholder="m@example.com"

                [value]="email()"
                (input)="updateField('email', $event)"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <app-button type="submit" class="block w-full" className="w-full" [disabled]="loading()">
              @if (loading()) {
                Please wait...
              } @else {
                Send Reset Link
              }
            </app-button>
          </form>
          <div class="mt-4 text-center text-sm text-muted-foreground">
            Remembered your password?
            <a routerLink="/auth/login" class="font-medium text-primary hover:underline">Log in</a>
          </div>
        }
      </app-card-content>
    </app-card>
  `
})
export class ForgotPasswordComponent {
  email = signal('');
  loading = signal(false);
  isSubmitted = signal(false);

  updateField(field: 'email', event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (field === 'email') this.email.set(value);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    // if (!this.email()) return;

    this.loading.set(true);
    setTimeout(() => {
      this.loading.set(false);
      this.isSubmitted.set(true);
      console.log('Password reset requested for:', this.email());
    }, 1000);
  }
}
