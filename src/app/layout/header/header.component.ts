import { Component, inject, signal, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideSun, LucideMoon, LucideSearch, LucideMenu, LucideUser, LucideSettings, LucideCreditCard, LucideLogOut } from '@lucide/angular';
import { ThemeService } from '../../core/services/theme.service';
import { SidebarService } from '../../core/services/sidebar.service';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LucideSun, LucideMoon, LucideSearch, LucideMenu, LucideUser, LucideSettings, LucideCreditCard, LucideLogOut],
  host: { class: 'block w-full z-30' },
  template: `
    <header class="flex h-14 w-full items-center gap-4 border-b bg-background px-4 sm:px-6">
      <!-- Mobile Sidebar Toggle -->
      <button class="md:hidden flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent" (click)="sidebarService.setMobileOpen(true)">
        <svg lucideMenu class="h-5 w-5"></svg>
      </button>

      <!-- Desktop Sidebar Toggle -->
      <button class="hidden md:flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent" (click)="sidebarService.toggleCollapse()">
        <svg lucideMenu class="h-5 w-5"></svg>
      </button>


      <div class="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form class="ml-auto flex-1 sm:flex-initial">
          <div class="relative">
            <svg lucideSearch class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"></svg>
            <input
              type="search"
              placeholder="Search products..."
              class="flex h-9 w-full sm:w-[300px] md:w-[200px] lg:w-[300px] rounded-md border border-input bg-background px-8 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
        </form>
      </div>

            <!-- Color Scheme Picker -->
      <div class="hidden sm:flex items-center gap-2 mr-2 bg-muted/50 px-2 py-1.5 rounded-full shadow-sm">
        <button 
          class="w-[18px] h-[18px] rounded-full ring-offset-background transition-all hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          style="background: linear-gradient(135deg, #18181b 50%, #e4e4e7 50%)"
          [class.ring-2]="themeService.colorScheme() === 'zinc'"
          [class.ring-primary]="themeService.colorScheme() === 'zinc'"
          [class.ring-offset-2]="themeService.colorScheme() === 'zinc'"
          (click)="themeService.setColorScheme('zinc')"
          title="Zinc Theme"
        ></button>
        <button 
          class="w-[18px] h-[18px] rounded-full ring-offset-background transition-all hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          style="background: linear-gradient(135deg, #1e3a8a 50%, #2563eb 50%)"
          [class.ring-2]="themeService.colorScheme() === 'blue'"
          [class.ring-primary]="themeService.colorScheme() === 'blue'"
          [class.ring-offset-2]="themeService.colorScheme() === 'blue'"
          (click)="themeService.setColorScheme('blue')"
          title="Ocean Blue Theme"
        ></button>
        <button 
          class="w-[18px] h-[18px] rounded-full ring-offset-background transition-all hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          style="background: linear-gradient(135deg, #2b1c20 50%, #e11d48 50%)"
          [class.ring-2]="themeService.colorScheme() === 'rose'"
          [class.ring-primary]="themeService.colorScheme() === 'rose'"
          [class.ring-offset-2]="themeService.colorScheme() === 'rose'"
          (click)="themeService.setColorScheme('rose')"
          title="Stone Burgundy Theme"
        ></button>
        <button 
          class="w-[18px] h-[18px] rounded-full ring-offset-background transition-all hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          style="background: linear-gradient(135deg, #17221d 50%, #10b981 50%)"
          [class.ring-2]="themeService.colorScheme() === 'green'"
          [class.ring-primary]="themeService.colorScheme() === 'green'"
          [class.ring-offset-2]="themeService.colorScheme() === 'green'"
          (click)="themeService.setColorScheme('green')"
          title="Forest Emerald Theme"
        ></button>
      </div>

      <!-- Theme Switcher -->
      <button class="flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent" (click)="themeService.toggleTheme()">
        @if (themeService.currentTheme() === 'dark') {
          <svg lucideSun class="h-5 w-5"></svg>
        } @else {
          <svg lucideMoon class="h-5 w-5"></svg>
        }
      </button>

            <!-- Profile Dropdown -->
      <div class="relative flex items-center dropdown-container">
        <button 
          class="relative flex h-8 w-8 items-center justify-center rounded-full bg-secondary hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
          (click)="toggleProfileMenu(); $event.stopPropagation()"
        >
          <span class="text-sm font-medium">U</span>
        </button>

        @if (isProfileMenuOpen()) {
          <div class="absolute right-0 top-full mt-2 w-56 rounded-md border bg-popover text-popover-foreground shadow-md outline-none z-50 animate-in fade-in zoom-in-95 duration-100" (click)="$event.stopPropagation()">
            <!-- Header -->
            <div class="flex flex-col space-y-1 p-4 border-b">
              <p class="text-sm font-medium leading-none">user&#64;example.com</p>
              <p class="text-xs leading-none text-muted-foreground">Premium Plan</p>
            </div>
                        <!-- Body -->
            <div class="p-1 border-b">
              <button class="w-full flex items-center px-2 py-2 text-sm rounded-sm hover:bg-muted transition-colors cursor-pointer">
                <svg lucideUser class="mr-2 h-4 w-4"></svg>
                <span>My Profile</span>
              </button>
              <button class="w-full flex items-center px-2 py-2 text-sm rounded-sm hover:bg-muted transition-colors cursor-pointer">
                <svg lucideCreditCard class="mr-2 h-4 w-4"></svg>
                <span>Billing Details</span>
              </button>
              <button class="w-full flex items-center px-2 py-2 text-sm rounded-sm hover:bg-muted transition-colors cursor-pointer">
                <svg lucideSettings class="mr-2 h-4 w-4"></svg>
                <span>Account Settings</span>
              </button>
            </div>
            
            <!-- Mobile Color Picker (Only shows on mobile) -->
            <div class="p-3 border-b sm:hidden">
              <p class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Accent Color</p>
              <div class="flex items-center gap-3">
                <button 
                  class="w-6 h-6 rounded-full ring-offset-background transition-all"
                  style="background: linear-gradient(135deg, #18181b 50%, #e4e4e7 50%)"
                  [class.ring-2]="themeService.colorScheme() === 'zinc'"
                  [class.ring-primary]="themeService.colorScheme() === 'zinc'"
                  [class.ring-offset-2]="themeService.colorScheme() === 'zinc'"
                  (click)="themeService.setColorScheme('zinc')"
                ></button>
                <button 
                  class="w-6 h-6 rounded-full ring-offset-background transition-all"
                  style="background: linear-gradient(135deg, #1e3a8a 50%, #2563eb 50%)"
                  [class.ring-2]="themeService.colorScheme() === 'blue'"
                  [class.ring-primary]="themeService.colorScheme() === 'blue'"
                  [class.ring-offset-2]="themeService.colorScheme() === 'blue'"
                  (click)="themeService.setColorScheme('blue')"
                ></button>
                <button 
                  class="w-6 h-6 rounded-full ring-offset-background transition-all"
                  style="background: linear-gradient(135deg, #2b1c20 50%, #e11d48 50%)"
                  [class.ring-2]="themeService.colorScheme() === 'rose'"
                  [class.ring-primary]="themeService.colorScheme() === 'rose'"
                  [class.ring-offset-2]="themeService.colorScheme() === 'rose'"
                  (click)="themeService.setColorScheme('rose')"
                ></button>
                <button 
                  class="w-6 h-6 rounded-full ring-offset-background transition-all"
                  style="background: linear-gradient(135deg, #17221d 50%, #10b981 50%)"
                  [class.ring-2]="themeService.colorScheme() === 'green'"
                  [class.ring-primary]="themeService.colorScheme() === 'green'"
                  [class.ring-offset-2]="themeService.colorScheme() === 'green'"
                  (click)="themeService.setColorScheme('green')"
                ></button>
              </div>
            </div>
            <!-- Footer -->
            <div class="border-t p-1">
              <button class="w-full flex items-center px-2 py-2 text-sm rounded-sm text-destructive hover:bg-destructive/10 transition-colors cursor-pointer" (click)="isProfileMenuOpen.set(false)">
                <svg lucideLogOut class="mr-2 h-4 w-4"></svg>
                <span>Log Out</span>
              </button>
            </div>
          </div>
        }
      </div>
    </header>
  `
})
export class HeaderComponent {
  themeService = inject(ThemeService);
  sidebarService = inject(SidebarService);
  elementRef = inject(ElementRef);
  
  isProfileMenuOpen = signal(false);

  toggleProfileMenu() {
    this.isProfileMenuOpen.set(!this.isProfileMenuOpen());
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isProfileMenuOpen.set(false);
    }
  }
}
