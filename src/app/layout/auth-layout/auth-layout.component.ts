import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { signal } from '@angular/core';
@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="flex min-h-screen grid-cols-2 lg:grid w-full pt-9">

      

      <!-- Left Branding Panel (Hidden on smaller screens) -->
      <div class="relative hidden lg:flex flex-col justify-between p-10 text-white overflow-hidden">
        <!-- Background Image & Overlay -->
        <div class="absolute inset-0 bg-zinc-900">
          <img
            src="https://images.unsplash.com/photo-1638625864149-ba4396c78274?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Authentication background"
            class="absolute inset-0 h-full w-full object-cover opacity-30"
          />
        </div>
        <div class="z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            class="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Exo Dash
        </div>
        <div class="z-20 mt-auto">
          <blockquote class="space-y-2">
            <p class="text-lg">
              &ldquo;This template has saved me countless hours of work and helped me deliver stunning dashboard designs to my clients faster than ever before.&rdquo;
            </p>
            <footer class="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>

      <!-- Right Auth Panel -->
      <div class="relative flex flex-col justify-center items-center p-8 bg-background w-full">
        <!-- Mobile Branding -->
        <div class="absolute top-8 left-8 lg:hidden flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            class="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Exo Dash
        </div>
        <!-- Theme Toggle Could Go Top Right Here -->

        <div class="mx-auto w-full max-w-[400px]">
          <router-outlet></router-outlet>
        </div>
      </div>

      </div>
  `
})
export class AuthLayoutComponent {
  }
