import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideDynamicIcon } from '@lucide/angular';
import { UserService, User } from '../../core/services/user.service';
import { CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent } from '../../shared/components/card/card.component';
import { TableComponent } from '../../shared/components/table/table.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { BadgeComponent } from '../../shared/components/badge/badge.component';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../shared/components/modal/modal.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    LucideDynamicIcon,
    CardComponent,
    CardContentComponent,
    CardHeaderComponent,
    CardTitleComponent,
    TableComponent,
    ButtonComponent,
    BadgeComponent,
    FormsModule,
    ModalComponent
  ],
  template: `
    <div class="flex-1 space-y-4">

      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Users</h1>
          <p class="text-muted-foreground mt-1">
            Manage your team members and their account permissions here.
          </p>
        </div>
        <app-button (click)="openAddModal()">
          <svg lucideIcon="plus" class="mr-2 h-4 w-4"></svg>
          Add User
        </app-button>
      </div>

      <!-- Main Content Card -->
      <app-card>
        <app-card-header class="pb-3 border-b">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <app-card-title>All Users ({{ userService.totalUsersCount() }})</app-card-title>

            <div class="flex items-center gap-2 w-full sm:w-auto">
              <div class="relative flex-1 sm:w-64 z-10">
                <svg lucideIcon="search" class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"></svg>
                <input
                  type="text"
                  placeholder="Search users..."
                  [value]="searchQuery()"
                  (input)="onSearchInput($event)"
                  class="flex h-9 w-full rounded-md border border-input bg-background pl-9 pr-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
              <app-button variant="outline" size="sm" class="h-9">
                <svg lucideIcon="filter" class="mr-2 h-4 w-4"></svg>
                Filter
              </app-button>
            </div>
          </div>
        </app-card-header>

        <app-card-content class="p-0">
          <app-table
            [data]="userService.users()"
            [columns]="columns"
            [searchQuery]="searchQuery()"
            [pageSize]="5">

            <ng-template #cellTemplate let-row let-col="col">

              @if (col.key === 'user') {
                <!-- User Info Column -->
                <div class="flex items-center gap-3">
                  <div class="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary font-medium text-xs">
                    {{ row.avatar }}
                  </div>
                  <div class="flex flex-col">
                    <span class="font-medium text-foreground">{{ row.name }}</span>
                    <span class="text-xs text-muted-foreground">{{ row.email }}</span>
                  </div>
                </div>
              }

              @else if (col.key === 'role') {
                <!-- Role Column -->
                <div class="flex items-center gap-1.5 text-sm text-foreground">
                  @if (row.role === 'Admin') {
                    <svg lucideIcon="shield" class="h-3.5 w-3.5 text-blue-500"></svg>
                  }
                  {{ row.role }}
                </div>
              }

              @else if (col.key === 'status') {
                <!-- Status Column -->
                <app-badge
                  [variant]="row.status === 'Active' ? 'default' : row.status === 'Pending' ? 'secondary' : 'outline'">
                  {{ row.status }}
                </app-badge>
              }

              @else if (col.key === 'lastActivity') {
                <!-- Last Activity Column -->
                <span class="text-muted-foreground text-sm flex items-center gap-1.5">
                  <span class="relative flex h-2 w-2">
                    @if (row.status === 'Active') {
                      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-600 opacity-75"></span>
                      <span class="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
                    } @else if (row.status === 'Pending') {
                      <span class="relative inline-flex rounded-full h-2 w-2 bg-orange-400"></span>
                    } @else {
                      <span class="relative inline-flex rounded-full h-2 w-2 bg-muted/60"></span>
                    }
                  </span>
                  {{ row.lastActivity }}
                </span>
              }

              @else if (col.key === 'actions') {
                <!-- Actions Column -->
                <div class="flex items-center gap-2">
                  <button (click)="openEditModal(row)" class="h-8 w-8 inline-flex items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors" title="Edit">
                    <svg lucideIcon="edit" class="h-4 w-4"></svg>
                  </button>
                  <button (click)="openDeleteModal(row)" class="h-8 w-8 inline-flex items-center justify-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors" title="Delete">
                    <svg lucideIcon="trash-2" class="h-4 w-4"></svg>
                  </button>
                  <button class="h-8 w-8 inline-flex items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors" title="More">
                    <svg lucideIcon="more-horizontal" class="h-4 w-4"></svg>
                  </button>
                </div>
              }

              @else {
                <!-- Default fallback (should not hit due to complete coverage, but good practice) -->
                {{ row[col.key] }}
              }
            </ng-template>
          </app-table>
        </app-card-content>
      </app-card>

    <!-- Delete Confirmation Modal -->
    <app-modal
      [isOpen]="isDeleteModalOpen()"
      (close)="isDeleteModalOpen.set(false)"
      [closeOnBackdropClick]="false"
      title="Delete User"
      description="This action cannot be undone. Are you sure you want to remove this user?"
    >
      @if (userToDelete(); as u) {
        <div class="bg-destructive/10 text-destructive text-sm font-medium p-3 rounded-md border border-destructive/20 mt-2">
          <div class="flex items-center gap-3">
            <svg lucideIcon="bell" class="h-5 w-5 shrink-0"></svg>
            <p>You are about to delete <strong>{{ u.name }}</strong> ({{ u.email }}). Their access will be revoked immediately.</p>
          </div>
        </div>
      }
      <div modal-footer class="mt-6 gap-2 flex w-full justify-end">
        <app-button variant="outline" (click)="isDeleteModalOpen.set(false)">Cancel</app-button>
        <app-button variant="destructive" (click)="confirmDelete()">Delete User</app-button>
      </div>
    </app-modal>

    <!-- User Form Modal -->
    <app-modal
      [isOpen]="isUserModalOpen()"
      (close)="closeUserModal()"
      [title]="editingUserId() ? 'Edit User' : 'Add New User'"
    >
      <div class="grid gap-4 py-4 cursor-default text-left">
        <div class="grid gap-2">
          <label for="name" class="text-sm font-medium leading-none">Full Name <span class="text-destructive">*</span></label>
          <input
            id="name"
            [(ngModel)]="newUserName"
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            placeholder="e.g. Jane Doe"
          />
        </div>
        <div class="grid gap-2">
          <label for="email" class="text-sm font-medium leading-none">Email Address <span class="text-destructive">*</span></label>
          <input
            id="email"
            type="email"
            [(ngModel)]="newUserEmail"
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            placeholder="e.g. jane@example.com"
          />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="grid gap-2">
            <label for="role" class="text-sm font-medium leading-none">Role</label>
            <select
              id="role"
              [(ngModel)]="newUserRole"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Member">Member</option>
            </select>
          </div>
          <div class="grid gap-2">
            <label for="status" class="text-sm font-medium leading-none">Status</label>
            <select
              id="status"
              [(ngModel)]="newUserStatus"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Offline">Offline</option>
            </select>
          </div>
        </div>
      </div>
      <div modal-footer class="mt-4 gap-2 flex w-full justify-end">
        <app-button variant="outline" (click)="closeUserModal()">Cancel</app-button>
        <app-button (click)="saveUser()" [disabled]="!newUserName() || !newUserEmail()">
          {{ editingUserId() ? 'Save Changes' : 'Add User' }}
        </app-button>
      </div>
    </app-modal>
    </div>
  `
})
export class UsersComponent {
  userService = inject(UserService);

  searchQuery = signal('');

  columns = [
    { key: 'user', label: 'User' },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Status' },
    { key: 'lastActivity', label: 'Last Activity' },
    { key: 'actions', label: 'Actions' }
  ];

  onSearchInput(event: Event) {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  // Modals state
  isDeleteModalOpen = signal(false);
  userToDelete = signal<User | null>(null);

  isUserModalOpen = signal(false);
  editingUserId = signal<string | null>(null);
  
  newUserName = signal('');
  newUserEmail = signal('');
  newUserRole = signal<'Admin' | 'Manager' | 'Member'>('Member');
  newUserStatus = signal<'Active' | 'Pending' | 'Offline'>('Active');

  openDeleteModal(user: User) {
    this.userToDelete.set(user);
    this.isDeleteModalOpen.set(true);
  }

  confirmDelete() {
    const user = this.userToDelete();
    if (user) {
      this.userService.deleteUser(user.id);
    }
    this.isDeleteModalOpen.set(false);
  }

  openAddModal() {
    this.editingUserId.set(null);
    this.resetForm();
    this.isUserModalOpen.set(true);
  }

  openEditModal(user: User) {
    this.editingUserId.set(user.id);
    this.newUserName.set(user.name);
    this.newUserEmail.set(user.email);
    this.newUserRole.set(user.role);
    this.newUserStatus.set(user.status);
    this.isUserModalOpen.set(true);
  }

  closeUserModal() {
    this.isUserModalOpen.set(false);
    setTimeout(() => this.resetForm(), 200);
  }

  resetForm() {
    this.newUserName.set('');
    this.newUserEmail.set('');
    this.newUserRole.set('Member');
    this.newUserStatus.set('Pending');
  }

  saveUser() {
    if (!this.newUserName() || !this.newUserEmail()) return;

    const initials = this.newUserName().split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);

    const editId = this.editingUserId();
    if (editId) {
      // Edit
      const orig = this.userService.users().find(u => u.id === editId);
      if (orig) {
        this.userService.updateUser({
          ...orig,
          name: this.newUserName(),
          email: this.newUserEmail(),
          role: this.newUserRole(),
          status: this.newUserStatus(),
          avatar: initials
        });
      }
    } else {
      // Add
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        name: this.newUserName(),
        email: this.newUserEmail(),
        role: this.newUserRole(),
        status: this.newUserStatus(),
        lastActivity: 'Just now',
        avatar: initials
      };
      this.userService.addUser(newUser);
    }
    this.closeUserModal();
  }
}
