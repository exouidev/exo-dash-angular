import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideDynamicIcon } from '@lucide/angular';
import { CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent } from '../../shared/components/card/card.component';


@Component({
  selector: 'app-documentation',
  standalone: true,
  imports: [CommonModule, LucideDynamicIcon, CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent],
  template: `
    <div class="flex-1 space-y-6 max-w-5xl mx-auto">

      <!-- Header -->
      <div class="flex flex-col space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Documentation & Tech Specs</h1>
        <p class="text-muted-foreground text-lg">
          Everything you need to know about setting up, developing, and extending this dashboard.
        </p>
      </div>

      <!-- Official Docs Callout -->
      <div class="rounded-lg border border-primary/20 bg-primary/5 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <h3 class="text-lg font-semibold text-foreground flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 text-primary"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            Complete Official Documentation
          </h3>
          <p class="text-sm text-muted-foreground">
            Looking for highly detailed component usage, styling recipes, and full API references? Check out the official web portal.
          </p>
        </div>
        <a href="https://exoui.dev/documentation" target="_blank" rel="noopener noreferrer" 
           class="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6 py-2 shadow-sm font-semibold">
          Explore Exo UI Docs
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 h-4 w-4"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
        </a>
      </div>

      <!-- Prerequisites -->
      <app-card class="block">
        <app-card-header>
          <div class="flex items-center gap-2">
            <svg lucideIcon="terminal" class="h-5 w-5 text-primary"></svg>
            <app-card-title>System Prerequisites</app-card-title>
          </div>
        </app-card-header>
        <app-card-content>
          <p class="text-muted-foreground mb-4">Ensure your development environment meets the following requirements before serving the application.</p>
          <ul class="space-y-4">
            <li class="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
              <div class="bg-muted rounded-sm px-1.5 py-0.5 shrink-0"><code class="text-xs font-mono text-primary">Node.js</code></div>
              <p class="text-sm text-muted-foreground leading-relaxed">Version 18.13.0 or higher is required. We recommend using <a href="https://github.com/nvm-sh/nvm" class="text-primary underline">nvm</a> to manage your node versions.</p>
            </li>
            <li class="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
              <div class="bg-muted rounded-sm px-1.5 py-0.5 shrink-0"><code class="text-xs font-mono text-primary">npm / yarn / pnpm</code></div>
              <p class="text-sm text-muted-foreground leading-relaxed">Supported package managers. The templates include a standard <code>package.json</code> and lock files.</p>
            </li>
            <li class="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
              <div class="bg-muted rounded-sm px-1.5 py-0.5 shrink-0"><code class="text-xs font-mono text-primary">Angular CLI</code></div>
              <p class="text-sm text-muted-foreground leading-relaxed">Version 22+. Install globally via <code>npm install -g @angular/cli</code>.</p>
            </li>
          </ul>
        </app-card-content>
      </app-card>

      <!-- Architecture -->
      <app-card class="block">
        <app-card-header>
          <div class="flex items-center gap-2">
            <svg lucideIcon="layout-template" class="h-5 w-5 text-primary"></svg>
            <app-card-title>Key Architectural Decisions</app-card-title>
          </div>
        </app-card-header>
        <app-card-content class="space-y-6">
          <div class="space-y-2">
            <h4 class="text-md font-semibold font-mono">1. Core Framework vs Library</h4>
            <p class="text-sm text-muted-foreground leading-relaxed">
              This template actively pivots away from traditional heavy UI component libraries (like Angular Material). Instead, it uses headless components combined with <strong>Tailwind CSS</strong>, deeply inspired by <code>shadcn/ui</code>. Every component in the <code>/shared</code> directory is fully owned by you, providing infinite styling flexibility without dependency bloat.
            </p>
          </div>
          <div class="space-y-2">
            <h4 class="text-md font-semibold font-mono">2. State Management (Signals)</h4>
            <p class="text-sm text-muted-foreground leading-relaxed">
              We leverage <strong>Angular Signals</strong> (via <code>signal()</code>, <code>computed()</code>, and <code>effect()</code>) extensively state management and reactive data flow, dropping RxJS BehaviorSubjects for standard template state. This ensures fine-grained reactivity, lightning-fast rendering without complex change detection lifecycles, and highly readable synchronous data reading.
            </p>
          </div>
          <div class="space-y-2">
            <h4 class="text-md font-semibold font-mono">3. Routing & Lazy Loading</h4>
            <p class="text-sm text-muted-foreground leading-relaxed">
              The application uses Angular 22's standalone component router architecture. All feature pages (like Dashboard, Analytics, Kanban) map to Lazy Loaded component bundles to keep the initial application load footprint aggressively small (<code>loadComponent</code>).
            </p>
          </div>
          <div class="space-y-2">
            <h4 class="text-md font-semibold font-mono">4. Folder Structure</h4>
            <ul class="text-sm text-muted-foreground list-disc pl-5 space-y-1">
              <li><code>src/app/core/</code> - Singleton services, guards, and interceptors (ThemeService, SidebarService).</li>
              <li><code>src/app/features/</code> - Routable page components containing complex business logic.</li>
              <li><code>src/app/shared/</code> - Pure, reusable UI components (Buttons, Cards, Inputs, Tables).</li>
              <li><code>src/app/layout/</code> - Global structural scaffolding (AppShell, Sidebar, Header layout).</li>
            </ul>
          </div>
        </app-card-content>
      </app-card>

      <!-- License & Support -->
      <app-card class="block">
        <app-card-header>
          <div class="flex items-center gap-2">
            <svg lucideIcon="shield-check" class="h-5 w-5 text-primary"></svg>
            <app-card-title>License Summary</app-card-title>
          </div>
        </app-card-header>
        <app-card-content>
          <div class="bg-muted/50 rounded-lg p-4 border text-sm text-muted-foreground leading-relaxed">
            <p class="mb-2"><strong class="text-foreground">Commercial Software License</strong></p>
            <p>
              By downloading, copying, accessing, or using this codebase, you agree to the following terms:
            </p>
            <ul class="list-disc pl-5 mt-2 mb-4 space-y-1">
              <li>You are granted a license to use, modify, and integrate the code into <strong>one (1)</strong> commercial or personal end-product (Single Application License).</li>
              <li>Multiple internal or client projects require an Extended / Multi-license.</li>
            </ul>
            <p class="mb-2"><strong class="text-foreground">Explicit Restrictions:</strong></p>
            <ul class="list-disc pl-5 mt-2 space-y-1">
              <li>You may not resell, redistribute, or sublicense the source code as a standalone template or downloadable asset.</li>
              <li>You may not make the source files publicly accessible in any public repository (e.g., GitHub/GitLab).</li>
            </ul>
          </div>
        </app-card-content>
      </app-card>

    </div>
  `
})
export class DocumentationComponent {
}
