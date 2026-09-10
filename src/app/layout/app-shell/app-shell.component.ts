import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { ToasterComponent } from '../../shared/components/toast/toaster.component';
import { SidebarService } from '../../core/services/sidebar.service';
import { signal } from '@angular/core';

@Component({
  selector: 'app-app-shell',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent, HeaderComponent, ToasterComponent],
  template: `
    <div class="flex min-h-screen w-full bg-muted/40">
      <app-sidebar></app-sidebar>

      <div class="flex flex-col flex-1 min-w-0 transition-all duration-300"
        [class.md:pl-16]="sidebarService.isCollapsed()"
        [class.md:pl-64]="!sidebarService.isCollapsed()">
        
        <div class="sticky top-0 z-40 w-full flex flex-col shadow-sm">
          
          <app-header></app-header>
        </div>
        <main class="flex-1 p-4 sm:p-6 w-full min-w-0">
          <router-outlet></router-outlet>
        </main>
          <app-toaster></app-toaster>
          </div>
    </div>
  `
})
export class AppShellComponent {
  sidebarService = inject(SidebarService);
  }
