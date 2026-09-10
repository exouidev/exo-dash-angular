import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideDynamicIcon } from '@lucide/angular';
import { SidebarService } from '../../core/services/sidebar.service';

interface NavLink {
  label: string;
  href?: string;
  icon: string;
  badge?: string;
  isPro?: boolean;
  children?: { label: string; href: string; isPro?: boolean }[];
}

interface NavGroup {
  title?: string;
  items: NavLink[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideDynamicIcon],
  template: `
    <!-- Desktop Sidebar -->
    <aside
      class="fixed hidden h-screen border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:flex flex-col transition-all duration-300 z-40"
      [class.w-16]="sidebarService.isCollapsed()"
      [class.w-64]="!sidebarService.isCollapsed()"
    >

      <div class="flex h-14 items-center border-b border-sidebar-border px-4 overflow-hidden" [class.justify-center]="sidebarService.isCollapsed()" [class.justify-between]="!sidebarService.isCollapsed()">
        @if (!sidebarService.isCollapsed()) {
          <div class="flex items-center gap-2 overflow-hidden"><svg lucideIcon="rocket" class="h-6 w-6 text-primary shrink-0"></svg><span class="font-bold text-lg whitespace-nowrap">Exo Dash</span></div>
        } @else {
          <svg lucideIcon="rocket" class="h-6 w-6 text-primary shrink-0"></svg>
        }
      </div>


      
      <div class="flex-1 overflow-y-auto overflow-x-hidden py-2 text-left">
        <!-- PRO BANNER -->
        <div class="mx-4 mt-6 mb-4 rounded-lg bg-primary/10 p-4 border border-primary/20">
          <h4 class="font-semibold text-sm mb-1 text-primary">Upgrade to Pro</h4>
          <p class="text-xs text-sidebar-foreground/70 mb-3 leading-relaxed whitespace-pre-wrap">Get 10+ premium apps and dashboards.</p>
          <button (click)="showFeaturesModal.set(true)" class="cursor-pointer block text-center w-full flex justify-center items-center text-xs font-semibold bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors">View Pro Features</button>
        </div>

        <nav class="grid gap-1 px-2">
          @for (group of navGroups; track group.title) {

            @if (group.title && !sidebarService.isCollapsed()) {
              <div class="px-3 py-2 mt-4 text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider whitespace-nowrap">
                {{ group.title }}
              </div>
            } @else if (group.title && sidebarService.isCollapsed()) {
              <div class="h-px bg-sidebar-border my-2 mx-3"></div>
            }

            @for (link of group.items; track link.label) {
              @if (!link.children) {
                <a [routerLink]="link.isPro ? null : link.href" (click)="handleMenuClick($event, link.isPro)" routerLinkActive="bg-sidebar-accent text-sidebar-accent-foreground" [routerLinkActiveOptions]="{exact: true}"
                  class="flex items-center gap-3 cursor-pointer rounded-lg px-3 py-2 text-sidebar-foreground/70 transition-all hover:text-sidebar-foreground hover:bg-sidebar-accent/50">
                  <svg [lucideIcon]="link.icon" class="h-4 w-4"></svg>
                  @if (!sidebarService.isCollapsed()) {
                    <div class="flex items-center gap-3">
                      <span>{{ link.label }}</span>
                      @if (link.isPro) {
                        <span class="rounded bg-primary/20 px-1.5 py-[2px] text-[9px] font-bold tracking-wider text-primary uppercase">PRO</span>
                      }
                    </div>
                    @if (link.badge) {
                      <span class="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">{{ link.badge }}</span>
                    }
                  }
                </a>
              } @else {
                <!-- Menu with children -->
                <div class="flex flex-col gap-1">
                  <button
                    class="flex items-center gap-3 cursor-pointer rounded-lg px-3 py-2 text-sidebar-foreground/70 transition-all hover:text-sidebar-foreground hover:bg-sidebar-accent/50 w-full text-left"
                    (click)="toggleMenu(link.label)">
                    <svg [lucideIcon]="link.icon" class="h-4 w-4 shrink-0"></svg>
                    @if (!sidebarService.isCollapsed()) {
                      <span class="flex-1 whitespace-nowrap">{{ link.label }}</span>
                      @if (link.isPro) {
                        <span class="rounded bg-primary/20 px-1.5 py-[2px] text-[9px] font-bold tracking-wider text-primary uppercase mr-2" (click)="$event.stopPropagation()">PRO</span>
                      }
                      <svg [lucideIcon]="isMenuExpanded(link.label) ? 'chevron-up' : 'chevron-down'" class="h-4 w-4 opacity-50 shrink-0"></svg>
                    }
                  </button>
                  @if (!sidebarService.isCollapsed() && isMenuExpanded(link.label)) {
                    <div class="grid gap-1 pl-9 pr-2">
                      @for (child of link.children; track child.href) {
                        <a [routerLink]="child.isPro ? null : child.href" (click)="handleMenuClick($event, child.isPro)" routerLinkActive="text-foreground"
                           class="flex items-center rounded-md px-2 py-1.5 text-sm cursor-pointer text-sidebar-foreground/70 transition-all hover:text-sidebar-foreground hover:bg-sidebar-accent/50 whitespace-nowrap">
                          <span class="flex-1">{{ child.label }}</span>
                          @if (child.isPro) {
                            <span class="rounded bg-primary/20 px-1.5 py-[2px] text-[9px] font-bold tracking-wider text-primary uppercase">PRO</span>
                          }
                        </a>
                      }
                    </div>
                  }
                </div>
              }
            }
          }
        </nav>
      </div>
    </aside>

    <!-- Mobile Overlay -->
    @if (sidebarService.isMobileOpen()) {
      <div class="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden" (click)="sidebarService.setMobileOpen(false)"></div>
    }

    <!-- Mobile Sidebar -->
    <aside
      class="fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border shadow-lg transition-transform duration-300 md:hidden"
      [class.translate-x-0]="sidebarService.isMobileOpen()"
      [class.-translate-x-full]="!sidebarService.isMobileOpen()"
    >
      <div class="flex h-14 items-center justify-between border-b border-sidebar-border px-4 shrink-0">
        <div class="flex items-center gap-2 overflow-hidden"><svg lucideIcon="rocket" class="h-6 w-6 text-primary shrink-0"></svg><span class="font-bold text-lg whitespace-nowrap">Exo Dash</span></div>
        <button class="h-8 w-8 rounded-sm hover:bg-accent flex items-center justify-center" (click)="sidebarService.setMobileOpen(false)">
          <svg lucideIcon="x" class="h-4 w-4"></svg>
        </button>
      </div>
      <div class="flex-1 overflow-y-auto py-2">
        <nav class="grid gap-1 px-2">
          @for (group of navGroups; track group.title) {
            @if (group.title) {
              <div class="px-3 py-2 mt-4 text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider whitespace-nowrap">
                {{ group.title }}
              </div>
            }
            @for (link of group.items; track link.label) {
              @if (!link.children) {
                <a [routerLink]="link.href" routerLinkActive="bg-sidebar-accent text-sidebar-accent-foreground" (click)="sidebarService.setMobileOpen(false)"
                  class="flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground/70 transition-all hover:text-sidebar-foreground hover:bg-sidebar-accent/50">
                  <svg [lucideIcon]="link.icon" class="h-4 w-4"></svg>
                  <span class="whitespace-nowrap">{{ link.label }}</span>
                  @if (link.badge) {
                    <span class="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">{{ link.badge }}</span>
                  }
                </a>
              } @else {
                <div class="flex flex-col gap-1">
                  <button
                    class="flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground/70 transition-all hover:text-sidebar-foreground hover:bg-sidebar-accent/50 w-full text-left"
                    (click)="toggleMenu(link.label)">
                    <svg [lucideIcon]="link.icon" class="h-4 w-4 shrink-0"></svg>
                    <span class="flex-1 whitespace-nowrap">{{ link.label }}</span>
                    <svg [lucideIcon]="isMenuExpanded(link.label) ? 'chevron-up' : 'chevron-down'" class="h-4 w-4 opacity-50 shrink-0"></svg>
                  </button>
                  @if (isMenuExpanded(link.label)) {
                    <div class="grid gap-1 pl-9 pr-2">
                      @for (child of link.children; track child.href) {
                        <a [routerLink]="child.href" routerLinkActive="text-foreground" (click)="sidebarService.setMobileOpen(false)"
                           class="rounded-md px-2 py-1.5 text-sm text-sidebar-foreground/70 transition-all hover:text-sidebar-foreground hover:bg-sidebar-accent/50 whitespace-nowrap">
                          {{ child.label }}
                        </a>
                      }
                    </div>
                  }
                </div>
              }
            }
          }
        </nav>
      </div>
    </aside>
    <!-- PRO PAYWALL MODAL -->
    @if (showProModal()) {
      <div class="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 text-left" (click)="showProModal.set(false)">
        <div class="bg-card w-full max-w-md rounded-xl border shadow-xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200" (click)="$event.stopPropagation()">
          
          <div class="p-6 text-center space-y-4 shadow-sm border-b">
            <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lock text-primary"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
            
            <div>
              <h2 class="text-xl font-bold tracking-tight mb-2 text-foreground">Pro Feature Locked</h2>
              <p class="text-sm text-foreground/70">Unlock this feature and access advanced dashboards, and 10+ premium applications with Exo UI Pro.</p>
            </div>
          </div>
          
          <div class="p-4 bg-muted/50 flex justify-end gap-2 text-foreground">
            <button class="px-4 py-2 text-sm font-medium border hover:bg-black/5 rounded-md transition-colors cursor-pointer" (click)="showProModal.set(false)">Close</button>
            <a href="https://exoui.dev" target="_blank" class="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md shadow-sm hover:opacity-90 transition-opacity flex items-center">Unlock Exo UI Pro</a>
          </div>
        </div>
      </div>
    }

    <!-- FEATURES MODAL -->
    @if (showFeaturesModal()) {
      <div class="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 text-left" (click)="showFeaturesModal.set(false)">
        <div class="bg-card w-full max-w-2xl rounded-xl border shadow-xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200" (click)="$event.stopPropagation()">
          <div class="p-6 shadow-sm border-b bg-muted/30">
            <h2 class="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles text-primary"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
              Exo UI Pro Features
            </h2>
            <p class="text-sm text-foreground/70 mt-1">Upgrade your dashboard with premium applications and advanced dashboards.</p>
          </div>
          
          <div class="p-6 overflow-y-auto max-h-[60vh]">
            <div class="grid md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <h3 class="font-semibold text-lg border-b pb-2 text-foreground">Premium Applications</h3>
                <ul class="space-y-3">
                  <li class="flex items-start gap-3 text-sm text-foreground/80">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check text-green-500 mt-0.5 shrink-0"><path d="M20 6 9 17l-5-5"/></svg>
                    <span><strong>Advanced Kanban Board:</strong> Full drag-and-drop task management.</span>
                  </li>
                  <li class="flex items-start gap-3 text-sm text-foreground/80">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check text-green-500 mt-0.5 shrink-0"><path d="M20 6 9 17l-5-5"/></svg>
                    <span><strong>Chat Application:</strong> Real-time messaging UI with contacts.</span>
                  </li>
                  <li class="flex items-start gap-3 text-sm text-foreground/80">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check text-green-500 mt-0.5 shrink-0"><path d="M20 6 9 17l-5-5"/></svg>
                    <span><strong>Email Client:</strong> Complete inbox management interface.</span>
                  </li>
                  <li class="flex items-start gap-3 text-sm text-foreground/80">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check text-green-500 mt-0.5 shrink-0"><path d="M20 6 9 17l-5-5"/></svg>
                    <span><strong>Calendar App:</strong> Event scheduling and management.</span>
                  </li>
                  <li class="flex items-start gap-3 text-sm text-foreground/80">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check text-green-500 mt-0.5 shrink-0"><path d="M20 6 9 17l-5-5"/></svg>
                    <span><strong>File Manager:</strong> Comprehensive file browsing and uploads.</span>
                  </li>
                </ul>
              </div>
              
              <div class="space-y-4">
                <h3 class="font-semibold text-lg border-b pb-2 text-foreground">More Features</h3>
                <ul class="space-y-3">
                  <li class="flex items-start gap-3 text-sm text-foreground/80">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check text-green-500 mt-0.5 shrink-0"><path d="M20 6 9 17l-5-5"/></svg>
                    <span><strong>Extra Dashboards:</strong> SaaS, Finance, and Analytics dashboards.</span>
                  </li>
                  <li class="flex items-start gap-3 text-sm text-foreground/80">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check text-green-500 mt-0.5 shrink-0"><path d="M20 6 9 17l-5-5"/></svg>
                    <span><strong>Advanced Data Tables:</strong> Pagination, sorting, and bulk actions.</span>
                  </li>

                  <li class="flex items-start gap-3 text-sm text-foreground/80">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check text-green-500 mt-0.5 shrink-0"><path d="M20 6 9 17l-5-5"/></svg>
                    <span><strong>Extensive UI Library:</strong> Over 50+ modular UI components & blocks.</span>
                  </li>

                </ul>
              </div>
            </div>
          </div>
          
          <div class="p-4 bg-muted/50 flex justify-end gap-2 text-foreground border-t shadow-sm">
            <button class="px-4 py-2 text-sm font-medium border hover:bg-black/5 rounded-md transition-colors cursor-pointer" (click)="showFeaturesModal.set(false)">Close</button>
            <a href="https://exoui.dev" target="_blank" class="px-6 py-2 text-sm font-bold bg-primary text-primary-foreground rounded-md shadow-sm hover:opacity-90 transition-opacity flex items-center gap-2">
              Unlock Exo UI Pro
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </div>
    }
  `

})
export class SidebarComponent {
  showProModal = signal(false);
  showFeaturesModal = signal(false);

  handleMenuClick(event: Event, isPro?: boolean) {
    if (isPro) {
      event.preventDefault();
      event.stopPropagation();
      this.showProModal.set(true);
    }
  }

  handleMobileMenuClick(event: Event, isPro?: boolean) {
    if (isPro) {
      event.preventDefault();
      event.stopPropagation();
      this.showProModal.set(true);
    } else {
       this.sidebarService.setMobileOpen(false);
    }
  }

  sidebarService = inject(SidebarService);

  readonly navGroups: NavGroup[] = [
    {
      title: 'Overview',
      items: [
        {
          label: 'Dashboards',
          icon: 'layout-dashboard',
          children: [
            { label: 'E-commerce', href: '/dashboard/ecommerce' },
            { label: 'SaaS', href: '#', isPro: true },
            { label: 'Finance', href: '#', isPro: true },
            { label: 'Analytics', href: '/dashboard/analytics' }
          ]
        },
      ]
    },
    {
      title: 'Apps & Management',
      items: [
        { label: 'Tickets', href: '#', isPro: true, icon: 'ticket', badge: '4' },
        { label: 'Email', href: '#', isPro: true, icon: 'mail', badge: '12' },
        { label: 'Chat', href: '#', isPro: true, icon: 'message-circle', badge: '3' },
        { label: 'To-Do', href: '#', isPro: true, icon: 'list-todo' },
        { label: 'Kanban', href: '#', isPro: true, icon: 'kanban' },
        { label: 'Calendar', href: '#', isPro: true, icon: 'calendar' },
        { label: 'File Manager', href: '#', isPro: true, icon: 'hard-drive' },
        { label: 'Products', href: '/products', icon: 'shopping-cart' },
        { label: 'Users', href: '/users', icon: 'users', badge: '3' }
      ]
    },
    {
      title: 'Components',
      items: [
        {
          label: 'UI Elements',
          icon: 'layers',
          children: [
            { label: 'Buttons', href: '/components/buttons' },
            { label: 'Cards', href: '/components/cards' },
            { label: 'Badges', href: '/components/badges' },
            { label: 'Alerts', href: '/components/alerts' },
            { label: 'Typography', href: '/components/typography' },
            { label: 'Avatars', href: '/components/avatars' },
            { label: 'Progress', href: '/components/progress' },
            { label: 'Accordions', href: '/components/accordions' },
            { label: 'Empty States', href: '/components/empty-states' },
            { label: 'Timelines', href: '/components/timelines' }
          ]
        },
        { label: 'Forms', href: '/forms', icon: 'check-circle' },
        { label: 'Modals', href: '/modals', icon: 'message-square' },
        { label: 'Data Tables', href: '/data-table', icon: 'table' },
        { label: 'Notifications', href: '/notifications', icon: 'bell' }
      ]
    },
    {
      title: 'System',
      items: [
        {
          label: 'Auth',
          icon: 'lock',
          children: [
            { label: 'Login', href: '/auth/login' },
            { label: 'Sign Up', href: '/auth/signup' },
            { label: 'Forgotten Password', href: '/auth/forgot-password' }
          ]
        },
        { label: 'Settings', href: '#', isPro: true, icon: 'settings' },
        { label: 'Documentation', href: '/documentation', icon: 'file-text' }
      ]
    }
  ];

  expandedMenus = signal<Record<string, boolean>>({ 'Dashboards': true });

  toggleMenu(label: string) {
    this.expandedMenus.update(current => ({
      ...current,
      [label]: !current[label]
    }));
  }

  isMenuExpanded(label: string): boolean {
    return !!this.expandedMenus()[label];
  }
}
