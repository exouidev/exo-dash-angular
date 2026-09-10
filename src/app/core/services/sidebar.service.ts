import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  readonly isCollapsed = signal<boolean>(false);
  readonly isMobileOpen = signal<boolean>(false);

  toggleCollapse() {
    this.isCollapsed.update(v => !v);
  }

  setCollapsed(collapsed: boolean) {
    this.isCollapsed.set(collapsed);
  }

  toggleMobile() {
    this.isMobileOpen.update(v => !v);
  }

  setMobileOpen(open: boolean) {
    this.isMobileOpen.set(open);
  }
}
