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
  children?: { label: string; href: string }[];
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


      <div class="flex-1 overflow-y-auto overflow-x-hidden py-2">
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
                <a [routerLink]="link.href" routerLinkActive="bg-sidebar-accent text-sidebar-accent-foreground" [routerLinkActiveOptions]="{exact: true}"
                  class="flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground/70 transition-all hover:text-sidebar-foreground hover:bg-sidebar-accent/50">
                  <svg [lucideIcon]="link.icon" class="h-4 w-4"></svg>
                  @if (!sidebarService.isCollapsed()) {
                    <span class="whitespace-nowrap">{{ link.label }}</span>
                    @if (link.badge) {
                      @if (link.badge === 'PRO') {
     <span class="ml-auto rounded bg-primary/20 px-1.5 py-[2px] text-[9px] font-bold tracking-wider text-primary uppercase">{{ link.badge }}</span>
   } @else {
     <span class="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">{{ link.badge }}</span>
   }
                    }
                  }
                </a>
              } @else {
                <!-- Menu with children -->
                <div class="flex flex-col gap-1">
                  <button
                    class="flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground/70 transition-all hover:text-sidebar-foreground hover:bg-sidebar-accent/50 w-full text-left"
                    (click)="toggleMenu(link.label)">
                    <svg [lucideIcon]="link.icon" class="h-4 w-4 shrink-0"></svg>
                    @if (!sidebarService.isCollapsed()) {
                      <span class="flex-1 whitespace-nowrap">{{ link.label }}</span>
                      <svg [lucideIcon]="isMenuExpanded(link.label) ? 'chevron-up' : 'chevron-down'" class="h-4 w-4 opacity-50 shrink-0"></svg>
                    }
                  </button>
                  @if (!sidebarService.isCollapsed() && isMenuExpanded(link.label)) {
                    <div class="grid gap-1 pl-9 pr-2">
                      @for (child of link.children; track child.href) {
                        <a [routerLink]="child.href" routerLinkActive="text-foreground"
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
                    @if (link.badge === 'PRO') {
     <span class="ml-auto rounded bg-primary/20 px-1.5 py-[2px] text-[9px] font-bold tracking-wider text-primary uppercase">{{ link.badge }}</span>
   } @else {
     <span class="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">{{ link.badge }}</span>
   }
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
  `
})
export class SidebarComponent {
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
            { label: 'Analytics', href: '/dashboard/analytics' }
          ]
        },
      ]
    },
    {
      title: 'Apps & Management',
      items: [
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
      title: 'Premium',
      items: [
        { label: 'Pro Components', href: '/pro-components', icon: 'sparkles', badge: 'PRO' }
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
