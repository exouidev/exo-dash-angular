import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { LucideDynamicIcon } from '@lucide/angular';
import { CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent } from '../../shared/components/card/card.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideDynamicIcon, CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent, ButtonComponent],
  template: `
    <app-card class="block w-full" className="border-0 shadow-none bg-transparent">
      <app-card-header class="space-y-1 text-center">
        <div class="flex justify-center mb-2">
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <svg lucideIcon="user-plus" class="h-5 w-5 text-primary"></svg>
          </div>
        </div>
        <app-card-title class="text-2xl font-bold tracking-tight">Create an account</app-card-title>
        <p class="text-sm text-muted-foreground">Enter your details below to create your account</p>
      </app-card-header>
      <app-card-content>
        <form (submit)="onSubmit($event)" class="space-y-4">
          <div class="space-y-2">
            <label for="name" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Full Name</label>
            <input 
              id="name" 
              type="text" 
              placeholder="John Doe" 
              
              [value]="name()"
              (input)="updateField('name', $event)"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
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
            <label for="password" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Password</label>
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
              Create Account
            }
          </app-button>
        </form>
        <div class="mt-4 text-center text-sm text-muted-foreground">
          Already have an account? 
          <a routerLink="/auth/login" class="font-medium text-primary hover:underline">Log in</a>
        </div>
      </app-card-content>
    </app-card>
  `
})
export class SignupComponent {
  router = inject(Router);
  name = signal('');
  email = signal('');
  password = signal('');
  loading = signal(false);

  updateField(field: 'name' | 'email' | 'password', event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (field === 'name') this.name.set(value);
    if (field === 'email') this.email.set(value);
    if (field === 'password') this.password.set(value);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    // if (!this.name() || !this.email() || !this.password()) return;
    
    this.loading.set(true);
    // Simulate API call and redirect
    setTimeout(() => {
      this.loading.set(false);
      this.router.navigate(['/']);
    }, 600);
  }
}
