import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { LucideDynamicIcon } from '@lucide/angular';
import { CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent } from '../../shared/components/card/card.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideDynamicIcon, CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent, ButtonComponent],
  template: `
    <app-card class="block w-full" className="border-0 shadow-none bg-transparent">
      <app-card-header class="space-y-1 text-center">
        <div class="flex justify-center mb-2">
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <svg lucideIcon="log-in" class="h-5 w-5 text-primary"></svg>
          </div>
        </div>
        <app-card-title class="text-2xl font-bold tracking-tight">Welcome back</app-card-title>
        <p class="text-sm text-muted-foreground">Enter your email and password to login</p>
      </app-card-header>
      <app-card-content>
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
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <label for="password" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Password</label>
              <a routerLink="/auth/forgot-password" class="text-sm font-medium text-primary hover:underline">Forgot password?</a>
            </div>
            <input 
              id="password" 
              type="password" 
              
              [value]="password()"
              (input)="updateField('password', $event)"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <app-button type="submit" class="block w-full" className="w-full" [disabled]="loading()">
            @if (loading()) {
              <svg lucideIcon="loader-2" class="mr-2 h-4 w-4 animate-spin"></svg>
              Please wait...
            } @else {
              Sign In
            }
          </app-button>
        </form>
        
        <div class="relative my-4">
          <div class="absolute inset-0 flex items-center">
            <span class="w-full border-t"></span>
          </div>
          <div class="relative flex justify-center text-xs uppercase">
            <span class="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <app-button type="button" variant="outline" className="w-full">
            <svg class="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
            Google
          </app-button>
          <app-button type="button" variant="outline" className="w-full">
            <svg class="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="apple" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path></svg>
            Apple
          </app-button>
        </div>

        <div class="mt-4 text-center text-sm text-muted-foreground">
          Don't have an account? 
          <a routerLink="/auth/signup" class="font-medium text-primary hover:underline">Sign up</a>
        </div>
      </app-card-content>
    </app-card>
  `
})
export class LoginComponent {
  router = inject(Router);
  email = signal('');
  password = signal('');
  loading = signal(false);

  updateField(field: 'email' | 'password', event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (field === 'email') this.email.set(value);
    if (field === 'password') this.password.set(value);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    // if (!this.email() || !this.password()) return;
    
    this.loading.set(true);
    // Simulate API call and redirect
    setTimeout(() => {
      this.loading.set(false);
      this.router.navigate(['/']);
    }, 600);
  }
}
