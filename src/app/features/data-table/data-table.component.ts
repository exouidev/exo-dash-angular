import { Component, signal, computed, HostListener, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideDynamicIcon } from '@lucide/angular';
import { TableComponent } from '../../shared/components/table/table.component';
import { CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent, CardDescriptionComponent } from '../../shared/components/card/card.component';
import { BadgeComponent } from '../../shared/components/badge/badge.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { UserRecord } from './data-table.model';
import { DataTableService } from './data-table.service';


@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    CommonModule, 
    LucideDynamicIcon, 
    TableComponent, 
    CardComponent, 
    CardHeaderComponent, 
    CardTitleComponent, 
    CardContentComponent,
    CardDescriptionComponent,
    BadgeComponent,
    ButtonComponent
  ],
  template: `
    <div class="flex-1 space-y-4 pb-8" (click)="closeDropdowns($event)">
      <div class="flex items-center justify-between space-y-2">
        <h2 class="text-3xl font-bold tracking-tight">Advanced Data Table</h2>
        <div class="flex items-center space-x-2">
          <app-button variant="outline">
            <svg lucideIcon="download" class="mr-2 h-4 w-4"></svg>
            Export
          </app-button>
          <app-button variant="default">
            <svg lucideIcon="plus" class="mr-2 h-4 w-4"></svg>
            Add User
          </app-button>
        </div>
      </div>

      <app-card>
        <app-card-header>
          <app-card-title>Users Directory</app-card-title>
          <app-card-description>Manage your team members. Double-click on Name or Role to edit inline.</app-card-description>
        </app-card-header>
        <app-card-content>
          
          <!-- Table Actions & Filters Bar -->
          <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 gap-4">
            <div class="flex flex-wrap items-center gap-2 w-full lg:w-auto">
              <!-- Global Search -->
              <div class="relative w-full sm:w-64">
                <svg lucideIcon="search" class="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"></svg>
                <input 
                  type="text" 
                  placeholder="Filter users..." 
                  [value]="searchQuery()"
                  (input)="searchQuery.set($any($event.target).value)"
                  class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pl-8 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>

              <!-- Facet: Role -->
              <div class="relative">
                <select 
                  class="flex h-9 w-[130px] items-center rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring appearance-none"
                  (change)="roleFilter.set($any($event.target).value)"
                >
                  <option value="">All Roles</option>
                  <option value="Owner">Owner</option>
                  <option value="Manager">Manager</option>
                  <option value="Developer">Developer</option>
                  <option value="Designer">Designer</option>
                  <option value="Analyst">Analyst</option>
                  <option value="Support">Support</option>
                  <option value="Guest">Guest</option>
                </select>
                <svg lucideIcon="chevron-down" class="absolute right-3 top-2.5 h-4 w-4 opacity-50 pointer-events-none"></svg>
              </div>

              <!-- Facet: Status -->
              <div class="relative">
                <select 
                  class="flex h-9 w-[130px] items-center rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring appearance-none"
                  (change)="statusFilter.set($any($event.target).value)"
                >
                  <option value="">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Offline">Offline</option>
                  <option value="Banned">Banned</option>
                </select>
                <svg lucideIcon="chevron-down" class="absolute right-3 top-2.5 h-4 w-4 opacity-50 pointer-events-none"></svg>
              </div>

            </div>
            
            <div class="flex items-center gap-2 w-full lg:w-auto">
              <!-- Column Visibility Toggler -->
              <div class="relative dropdown-container">
                <app-button variant="outline" size="sm" class="h-9" (click)="toggleDropdown('columns'); $event.stopPropagation()">
                  <svg lucideIcon="layers" class="mr-2 h-4 w-4"></svg>
                  Columns
                  <svg lucideIcon="chevron-down" class="ml-2 h-4 w-4 opacity-50"></svg>
                </app-button>
                
                @if (activeDropdown() === 'columns') {
                  <div class="absolute right-0 top-full mt-1 w-48 rounded-md border bg-popover text-popover-foreground shadow-md outline-none z-50 p-1" (click)="$event.stopPropagation()">
                    <div class="px-2 py-1.5 text-sm font-semibold">Toggle Columns</div>
                    <div class="h-px bg-muted my-1"></div>
                    @for (col of allColumns; track col.key) {
                      @if (col.key !== 'select' && col.key !== 'actions') {
                        <label class="flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-muted rounded-sm cursor-pointer">
                          <input type="checkbox" 
                            class="h-4 w-4 rounded border-primary text-primary focus:ring-primary"
                            [checked]="visibleColumnKeys().has(col.key)"
                            (change)="toggleColumn(col.key)"
                          />
                          {{ col.label }}
                        </label>
                      }
                    }
                  </div>
                }
              </div>

              <div class="text-sm text-muted-foreground hidden sm:block">
                {{ selectedRows().size }} selected
              </div>
              @if (selectedRows().size > 0) {
                <app-button variant="destructive" size="sm" class="h-9">Delete</app-button>
              }
            </div>
          </div>

          <!-- The Data Table -->
          <app-table
            [data]="filteredData()"
            [columns]="activeColumns()"
            [searchQuery]="searchQuery()"
            [pageSize]="10"
            [isLoading]="isLoading()"
          >
            <!-- Define the custom cell template -->
            <ng-template #cellTemplate let-row let-col="col">
              
              <!-- Checkbox Column -->
              @if (col.key === 'select') {
                <input 
                  type="checkbox" 
                  role="checkbox"
                  class="h-4 w-4 cursor-pointer rounded border-primary text-primary focus:ring-primary"
                  [checked]="selectedRows().has(row.id)"
                  (change)="toggleSelection(row.id)"
                />
              } 
              
              <!-- User/Avatar Column -->
              @else if (col.key === 'user') {
                <div class="flex items-center gap-3">
                  <div class="h-9 w-9 rounded-full bg-muted flex items-center justify-center overflow-hidden border shrink-0">
                    <img [src]="row.avatar" alt="Avatar" class="h-full w-full object-cover shrink-0" (error)="handleImageError($event)"/>
                  </div>
                  <div class="flex flex-col w-full min-w-0" (dblclick)="startEditing(row.id, 'name')">
                    @if (editingCell()?.id === row.id && editingCell()?.field === 'name') {
                      <input 
                        type="text" 
                        [value]="row.name" 
                        (click)="$event.stopPropagation()" 
                        (blur)="saveEdit(row.id, 'name', $event)" 
                        (keydown.enter)="saveEdit(row.id, 'name', $event)"
                        class="h-6 w-full rounded-sm border border-input bg-transparent px-1 text-sm outline-none ring-1 ring-ring"
                        autofocus
                      />
                    } @else {
                      <span class="font-medium leading-none mb-1 truncate cursor-pointer hover:text-primary transition-colors tooltip" title="Double click to edit">{{ row.name }}</span>
                    }
                    <span class="text-xs text-muted-foreground truncate">{{ row.email }}</span>
                  </div>
                </div>
              } 
              
              <!-- Status Badge Column -->
              @else if (col.key === 'status') {
                <div (dblclick)="startEditing(row.id, 'status')" class="cursor-pointer">
                  @if (editingCell()?.id === row.id && editingCell()?.field === 'status') {
                    <select 
                      (blur)="saveEdit(row.id, 'status', $event)" 
                      (click)="$event.stopPropagation()" 
                      (keydown.enter)="saveEdit(row.id, 'status', $event)"
                      class="h-6 rounded-sm border border-input bg-transparent px-1 text-xs outline-none ring-1 ring-ring"
                      autofocus
                    >
                      <option value="Active" [selected]="row.status === 'Active'">Active</option>
                      <option value="Offline" [selected]="row.status === 'Offline'">Offline</option>
                      <option value="Banned" [selected]="row.status === 'Banned'">Banned</option>
                    </select>
                  } @else {
                    <app-badge [variant]="getBadgeVariant(row.status)">
                      {{ row.status }}
                    </app-badge>
                  }
                </div>
              } 
              
              <!-- Role Column -->
              @else if (col.key === 'role') {
                <div class="w-full" (dblclick)="startEditing(row.id, 'role')">
                  @if (editingCell()?.id === row.id && editingCell()?.field === 'role') {
                    <input 
                      type="text" 
                      [value]="row.role" 
                      (click)="$event.stopPropagation()" 
                      (blur)="saveEdit(row.id, 'role', $event)" 
                      (keydown.enter)="saveEdit(row.id, 'role', $event)"
                      class="h-6 w-24 rounded-sm border border-input bg-transparent px-1 text-sm outline-none ring-1 ring-ring"
                      autofocus
                    />
                  } @else {
                    <span class="text-muted-foreground cursor-pointer hover:text-foreground border-b border-transparent hover:border-muted-foreground border-dashed" title="Double click to edit">{{ row.role }}</span>
                  }
                </div>
              }

              <!-- Actions Dropdown Column -->
              @else if (col.key === 'actions') {
                <div class="flex justify-end pr-4 relative">
                  <button class="h-8 w-8 rounded-md hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors" (click)="toggleDropdown('action-' + row.id); $event.stopPropagation()">
                    <svg lucideIcon="more-horizontal" class="h-4 w-4"></svg>
                  </button>

                  @if (activeDropdown() === 'action-' + row.id) {
                    <div class="absolute right-8 top-0 mt-1 w-32 rounded-md border bg-popover text-popover-foreground shadow-md outline-none z-50 p-1" (click)="$event.stopPropagation()">
                      <button class="w-full text-left px-2 py-1.5 text-sm hover:bg-muted flex items-center rounded-sm" (click)="startEditing(row.id, 'name'); activeDropdown.set(null)">
                        <svg lucideIcon="edit" class="mr-2 h-4 w-4"></svg> Edit
                      </button>
                      <button class="w-full text-left px-2 py-1.5 text-sm hover:bg-muted text-destructive flex items-center rounded-sm" (click)="deleteRow(row.id); activeDropdown.set(null)">
                        <svg lucideIcon="trash-2" class="mr-2 h-4 w-4"></svg> Delete
                      </button>
                    </div>
                  }
                </div>
              }
              
              <!-- Default rendering -->
              @else {
                <span class="text-muted-foreground">{{ row[col.key] }}</span>
              }
              
            </ng-template>
          </app-table>

        </app-card-content>
      </app-card>
    </div>
  `
})
export class DataTableComponent implements OnInit {
  
  // All possible columns
  allColumns = [
    { key: 'select', label: '' },
    { key: 'user', label: 'User' },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Status' },
    { key: 'lastActive', label: 'Last Active' },
    { key: 'actions', label: '' }
  ];

  // State
  searchQuery = signal<string>('');
  selectedRows = signal<Set<string>>(new Set<string>());
  visibleColumnKeys = signal<Set<string>>(new Set(['select', 'user', 'role', 'status', 'lastActive', 'actions']));
  activeDropdown = signal<string | null>(null);
  
  // Facets
  roleFilter = signal<string>('');
  statusFilter = signal<string>('');

  // Inline Editing
  editingCell = signal<{id: string, field: keyof UserRecord} | null>(null);

  baseData = signal<UserRecord[]>([]);
  isLoading = signal(true);
  private dataTableService = inject(DataTableService);

  ngOnInit() {
    this.isLoading.set(true);
    this.dataTableService.getUsers().subscribe(data => {
       this.baseData.set(data);
       this.isLoading.set(false);
    });
  }

  // Computed Projections
  activeColumns = computed(() => {
    return this.allColumns.filter(c => this.visibleColumnKeys().has(c.key));
  });

  filteredData = computed(() => {
    return this.baseData().filter(u => {
      const matchRole = !this.roleFilter() || u.role === this.roleFilter();
      const matchStatus = !this.statusFilter() || u.status === this.statusFilter();
      return matchRole && matchStatus;
    });
  });

  // Global Click listener to close dropdowns
  closeDropdowns(event?: Event) {
    this.activeDropdown.set(null);
    this.editingCell.set(null); // Also cancel edit if clicked outside
  }

  toggleDropdown(id: string) {
    if (this.activeDropdown() === id) {
      this.activeDropdown.set(null);
    } else {
      this.activeDropdown.set(id);
    }
  }

  toggleColumn(key: string) {
    this.visibleColumnKeys.update(set => {
      const newSet = new Set(set);
      if (newSet.has(key)) newSet.delete(key);
      else newSet.add(key);
      return newSet;
    });
  }

  toggleSelection(id: string) {
    this.selectedRows.update(set => {
      const newSet = new Set(set);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  }

  deleteRow(id: string) {
    // Optimistic Delete
    this.baseData.update(data => data.filter(r => r.id !== id));
    this.selectedRows.update(set => {
      const newSet = new Set(set);
      newSet.delete(id);
      return newSet;
    });
    
    // Save to server
    this.dataTableService.deleteUser(id).subscribe();
  }

  startEditing(rowId: string, field: keyof UserRecord) {
    this.editingCell.set({ id: rowId, field });
  }

  saveEdit(rowId: string, field: keyof UserRecord, event: Event) {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    if (!target) return;
    const value = target.value;
    
    // Optimistic Update
    this.baseData.update(users => users.map(u => u.id === rowId ? { ...u, [field]: value } : u));
    this.editingCell.set(null);

    // Save to Server
    this.dataTableService.updateUser(rowId, { [field]: value }).subscribe();
  }

  getBadgeVariant(status: string): 'default' | 'secondary' | 'destructive' | 'outline' {
    switch (status) {
      case 'Active': return 'default';
      case 'Offline': return 'secondary';
      case 'Banned': return 'destructive';
      default: return 'outline';
    }
  }

  handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150"><rect width="150" height="150" fill="%23e2e8f0"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%2364748b">👤</text></svg>';
  }
}
