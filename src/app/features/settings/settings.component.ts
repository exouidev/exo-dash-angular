import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideDynamicIcon } from '@lucide/angular';
import { CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent, CardDescriptionComponent } from '../../shared/components/card/card.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { BadgeComponent } from '../../shared/components/badge/badge.component';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../shared/components/modal/modal.component';

type SettingsTab = 'profile' | 'security' | 'notifications' | 'billing';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, LucideDynamicIcon, CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent, CardDescriptionComponent, ButtonComponent, BadgeComponent, FormsModule, ModalComponent],
  template: `
    <div class="flex-1 space-y-4">

      <!-- Header -->
      <div class="flex flex-col gap-1">
        <h1 class="text-3xl font-bold tracking-tight">Settings</h1>
        <p class="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>

      <!-- Settings Layout -->
      <div class="flex flex-col md:flex-row gap-8">

        <!-- Sidebar Navigation -->
        <aside class="w-full md:w-64 shrink-0">
          <nav class="flex flex-wrap md:flex-col gap-1">
            @for (tab of tabs; track tab.id) {
              <button
                (click)="activeTab.set(tab.id)"
                class="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors w-full"
                [class]="activeTab() === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'"
              >
                <svg [lucideIcon]="tab.icon" class="h-4 w-4"></svg>
                {{ tab.label }}
              </button>
            }
          </nav>
        </aside>

        <!-- Content Area -->
        <main class="flex-1 min-w-0 space-y-6">

          @if (activeTab() === 'profile') {
            <!-- Profile Settings -->
            <div class="grid gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <app-card>
                <app-card-header>
                  <app-card-title>Public Profile</app-card-title>
                  <app-card-description>This is how others will see you on the site.</app-card-description>
                </app-card-header>
                <app-card-content className="space-y-6">

                  <div class="flex items-center gap-6">
                    <div class="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold border-2 border-primary/20 shrink-0">
                      {{ initials() }}
                    </div>
                    <div class="space-y-2">
                      <app-button variant="outline" size="sm">
                        <svg lucideIcon="upload" class="h-4 w-4 mr-2"></svg>
                        Change Avatar
                      </app-button>
                      <p class="text-[0.8rem] text-muted-foreground">
                        JPG, GIF or PNG. Max size of 800K.
                      </p>
                    </div>
                  </div>

                  <div class="grid gap-4 sm:grid-cols-2">
                    <div class="space-y-2">
                      <label class="text-sm font-medium">First name</label>
                      <input type="text" [value]="profile()?.firstName" (input)="updateProfile('firstName', $event)" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    </div>
                    <div class="space-y-2">
                      <label class="text-sm font-medium">Last name</label>
                      <input type="text" [value]="profile()?.lastName" (input)="updateProfile('lastName', $event)" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    </div>
                  </div>

                  <div class="space-y-2">
                    <label class="text-sm font-medium">Email address</label>
                    <input type="email" disabled [value]="profile()?.email" class="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm ring-offset-background cursor-not-allowed opacity-70">
                    <p class="text-[0.8rem] text-muted-foreground">Your email address cannot be changed from the profile panel.</p>
                  </div>

                  <div class="space-y-2">
                    <label class="text-sm font-medium">Username</label>
                    <div class="relative flex items-center">
                      <span class="absolute left-3 text-muted-foreground text-sm font-mono shrink-0">@</span>
                      <input type="text" [value]="profile()?.username" (input)="updateProfile('username', $event)" class="flex h-10 w-full rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    </div>
                    <p class="text-[0.8rem] text-muted-foreground">This is your public display name.</p>
                  </div>

                  <div class="space-y-2">
                    <label class="text-sm font-medium">Bio</label>
                    <textarea [value]="profile()?.bio" (input)="updateProfile('bio', $event)" rows="3" class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" placeholder="Tell us a little bit about yourself"></textarea>
                    <p class="text-[0.8rem] text-muted-foreground">Maximum 160 characters. You can mention other users and organizations.</p>
                  </div>

                  <div class="grid gap-4 sm:grid-cols-2">
                    <div class="space-y-2">
                      <label class="text-sm font-medium">Website</label>
                      <input type="url" [value]="profile()?.website" (input)="updateProfile('website', $event)" placeholder="https://..." class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    </div>
                    <div class="space-y-2">
                      <label class="text-sm font-medium">Location</label>
                      <input type="text" [value]="profile()?.location" (input)="updateProfile('location', $event)" placeholder="City, Country" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    </div>
                  </div>

                  <div class="flex justify-start">
                    <app-button (click)="save('profile')" [disabled]="saving()">
                      @if (saving()) { <svg lucideIcon="loader-2" class="mr-2 h-4 w-4 animate-spin"></svg> Saving... }
                      @else { Save Changes }
                    </app-button>
                  </div>
                </app-card-content>
              </app-card>
            </div>
          }

          @if (activeTab() === 'security') {
            <!-- Security Settings -->
            <div class="grid gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <app-card>
                <app-card-header>
                  <app-card-title>Change Password</app-card-title>
                  <app-card-description>Ensure your account is using a long, random password to stay secure.</app-card-description>
                </app-card-header>
                <app-card-content className="space-y-4">
                  <div class="space-y-2">
                    <label class="text-sm font-medium">Current password</label>
                    <input type="password" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  </div>
                  <div class="space-y-2">
                    <label class="text-sm font-medium">New password</label>
                    <input type="password" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  </div>
                  <div class="flex justify-start pt-2">
                    <app-button (click)="save('password')" [disabled]="saving()">
                      @if (saving()) { <svg lucideIcon="loader-2" class="mr-2 h-4 w-4 animate-spin"></svg> Updating... }
                      @else { Update Password }
                    </app-button>
                  </div>
                </app-card-content>
              </app-card>

              <app-card>
                <app-card-header className="!flex-row items-center justify-between !space-y-0 pb-2">
                  <div class="space-y-1">
                    <app-card-title>Two-Factor Authentication</app-card-title>
                    <app-card-description>Protect your account with an extra layer of security.</app-card-description>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" [checked]="tfaEnabled()" (change)="tfaEnabled.set(!tfaEnabled())" class="sr-only peer">
                    <div class="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-ring rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary transition-colors"></div>
                  </label>
                </app-card-header>
                <app-card-content>
                  @if (tfaEnabled()) {
                    <p class="text-sm text-green-600 dark:text-green-600 font-medium flex items-center mt-2">
                      <svg lucideIcon="check-circle" class="h-4 w-4 mr-2"></svg>
                      2FA is currently enabled
                    </p>
                  } @else {
                    <p class="text-sm text-muted-foreground mt-2">
                      Not configured. It is highly recommended to enable 2FA.
                    </p>
                  }
                </app-card-content>
              </app-card>

              <app-card>
                <app-card-header>
                  <app-card-title>Active Sessions</app-card-title>
                  <app-card-description>Manage and log out your active sessions on other devices.</app-card-description>
                </app-card-header>
                <app-card-content className="space-y-4">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <svg lucideIcon="laptop" class="h-5 w-5 text-muted-foreground"></svg>
                      <div class="space-y-0.5">
                        <p class="text-sm font-medium leading-none">MacBook Pro (Mac OS)</p>
                        <p class="text-xs text-muted-foreground">Chrome - Dublin, Ireland • <span class="text-green-600 font-medium">Active now</span></p>
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <svg lucideIcon="smartphone" class="h-5 w-5 text-muted-foreground"></svg>
                      <div class="space-y-0.5">
                        <p class="text-sm font-medium leading-none">iPhone 14 Pro (iOS)</p>
                        <p class="text-xs text-muted-foreground">Safari - London, UK • 2 hours ago</p>
                      </div>
                    </div>
                    <app-button variant="ghost" size="icon" class="text-muted-foreground hover:text-destructive">
                      <svg lucideIcon="log-out" class="h-4 w-4"></svg>
                    </app-button>
                  </div>
                </app-card-content>
              </app-card>
            </div>
          }

          @if (activeTab() === 'notifications') {
            <!-- Notification Settings -->
            <div class="grid gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <app-card>
                <app-card-header>
                  <app-card-title>Notification Preferences</app-card-title>
                  <app-card-description>Choose what we notify you about and how we deliver it.</app-card-description>
                </app-card-header>
                <app-card-content className="space-y-6">

                  <div class="space-y-4">
                    <h4 class="text-sm font-semibold tracking-tight uppercase text-muted-foreground">Email Notifications</h4>

                    <div class="flex items-center justify-between">
                      <div class="space-y-0.5">
                        <label class="text-sm font-medium">Security Alerts</label>
                        <p class="text-[0.8rem] text-muted-foreground">Crucial updates about your account security.</p>
                      </div>
                      <label class="relative inline-flex items-center cursor-not-allowed opacity-70">
                        <input type="checkbox" checked disabled class="sr-only peer">
                        <div class="w-11 h-6 bg-primary rounded-full after:content-[''] after:absolute after:top-[2px] after:left-[24px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5"></div>
                      </label>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="space-y-0.5">
                        <label class="text-sm font-medium">Product Updates</label>
                        <p class="text-[0.8rem] text-muted-foreground">New features and available beta releases.</p>
                      </div>
                      <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" [checked]="notifs().product" (change)="updateNotifs('product')" class="sr-only peer">
                        <div class="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-ring rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary transition-colors"></div>
                      </label>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="space-y-0.5">
                        <label class="text-sm font-medium">Marketing Emails</label>
                        <p class="text-[0.8rem] text-muted-foreground">Promotions, discounts and marketing campaigns.</p>
                      </div>
                      <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" [checked]="notifs().marketing" (change)="updateNotifs('marketing')" class="sr-only peer">
                        <div class="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-ring rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary transition-colors"></div>
                      </label>
                    </div>
                  </div>

                </app-card-content>
              </app-card>
            </div>
          }

          @if (activeTab() === 'billing') {
            <!-- Billing Settings -->
            <div class="grid gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <app-card className="border-primary/50 shadow-sm bg-primary/5">
                <app-card-header>
                  <app-card-title className="flex flex-row items-center justify-between w-full">
                    <span>Current Plan</span>
                    <app-badge variant="default" class="bg-primary">Pro Tier</app-badge>
                  </app-card-title>
                  <app-card-description className="text-foreground/80">You are currently on the Pro plan, billed annually.</app-card-description>
                </app-card-header>
                <app-card-content>
                  <div class="space-y-2 mb-6">
                    <div class="flex items-center justify-between text-sm">
                      <span class="font-medium">Data Storage Usage</span>
                      <span class="text-muted-foreground">45 GB / 100 GB</span>
                    </div>
                    <div class="h-2 w-full bg-background rounded-full overflow-hidden border">
                      <div class="h-full bg-primary" style="width: 45%;"></div>
                    </div>
                  </div>
                  <div class="flex gap-3">
                    <app-button>Upgrade Plan</app-button>
                    <app-button variant="outline" class="bg-background">Cancel Subscription</app-button>
                  </div>
                </app-card-content>
              </app-card>

              <app-card>
                <app-card-header>
                  <app-card-title>Payment Method</app-card-title>
                  <app-card-description>Manage how you pay for your subscription.</app-card-description>
                </app-card-header>
                <app-card-content className="space-y-4">
                  
                  @for (pm of paymentMethods(); track pm.id) {
                    <div class="flex items-center justify-between p-4 border rounded-lg" [class.border-primary]="pm.isDefault">
                      <div class="flex items-center gap-4">
                        <div class="h-10 w-14 bg-accent rounded flex items-center justify-center">
                          <svg lucideIcon="credit-card" class="h-5 w-5 text-foreground"></svg>
                        </div>
                        <div class="space-y-1">
                          <p class="text-sm font-medium leading-none">{{ pm.type }} ending in {{ pm.last4 }}</p>
                          <p class="text-xs text-muted-foreground">Expires {{ pm.expiryMonth }}/{{ pm.expiryYear }}</p>
                        </div>
                      </div>
                      <div class="flex items-center gap-2">
                        @if (pm.isDefault) {
                          <span class="text-xs font-medium text-primary mr-2 hidden sm:inline-block">Default</span>
                        }
                        <app-button variant="ghost" size="sm" (click)="openEditPaymentModal(pm)">Edit</app-button>
                      </div>
                    </div>
                  }

                  <app-button variant="outline" class="block w-full" className="mt-4 w-full border-dashed" (click)="openAddPaymentModal()">
                    <svg lucideIcon="plus" class="mr-2 h-4 w-4"></svg>
                    Add new payment method
                  </app-button>
                </app-card-content>
              </app-card>

              <app-card>
                <app-card-header>
                  <app-card-title>Billing History</app-card-title>
                  <app-card-description>View and download your previous invoices.</app-card-description>
                </app-card-header>
                <app-card-content className="p-0">
                  <div class="flex items-center justify-between p-4 border-b last:border-0 hover:bg-muted/50 transition-colors">
                    <div class="space-y-1">
                      <p class="text-sm font-medium leading-none">INV-2026-081</p>
                      <p class="text-xs text-muted-foreground">August 1, 2026</p>
                    </div>
                    <div class="flex items-center gap-4">
                      <span class="text-sm font-medium">$49.00</span>
                      <app-button variant="ghost" size="icon" title="Download Invoice">
                        <svg lucideIcon="download" class="h-4 w-4"></svg>
                      </app-button>
                    </div>
                  </div>
                  <div class="flex items-center justify-between p-4 border-b last:border-0 hover:bg-muted/50 transition-colors">
                    <div class="space-y-1">
                      <p class="text-sm font-medium leading-none">INV-2026-071</p>
                      <p class="text-xs text-muted-foreground">July 1, 2026</p>
                    </div>
                    <div class="flex items-center gap-4">
                      <span class="text-sm font-medium">$49.00</span>
                      <app-button variant="ghost" size="icon" title="Download Invoice">
                        <svg lucideIcon="download" class="h-4 w-4"></svg>
                      </app-button>
                    </div>
                  </div>
                </app-card-content>
              </app-card>
            </div>
          }

        </main>
      </div>
    </div>
    
    <!-- Payment Method Modal -->
    <app-modal
      [isOpen]="isPaymentModalOpen()"
      (close)="closePaymentModal()"
      [title]="editingPaymentId() ? 'Edit Payment Method' : 'Add Payment Method'"
    >
      <div class="grid gap-4 py-4 cursor-default text-left">
        <div class="grid gap-2">
          <label for="cardNumber" class="text-sm font-medium leading-none">Card Number</label>
          <input
            id="cardNumber"
            [(ngModel)]="pmCardNumber"
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            placeholder="•••• •••• •••• 4242"
            [disabled]="editingPaymentId() !== null"
          />
          @if (editingPaymentId() !== null) {
            <p class="text-xs text-muted-foreground mt-1">For security reasons, you cannot fullly view or edit an existing card number. Please remove it and add a new one if it has changed.</p>
          }
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div class="grid gap-2">
             <label for="expMonth" class="text-sm font-medium leading-none">Exp. Month</label>
             <select
               id="expMonth"
               [(ngModel)]="pmExpiryMonth"
               class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
             >
               <option value="01">01</option>
               <option value="02">02</option>
               <option value="03">03</option>
               <option value="04">04</option>
               <option value="05">05</option>
               <option value="06">06</option>
               <option value="07">07</option>
               <option value="08">08</option>
               <option value="09">09</option>
               <option value="10">10</option>
               <option value="11">11</option>
               <option value="12">12</option>
             </select>
          </div>
          <div class="grid gap-2">
             <label for="expYear" class="text-sm font-medium leading-none">Exp. Year</label>
             <select
               id="expYear"
               [(ngModel)]="pmExpiryYear"
               class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
             >
               <option value="2026">2026</option>
               <option value="2027">2027</option>
               <option value="2028">2028</option>
               <option value="2029">2029</option>
               <option value="2030">2030</option>
               <option value="2031">2031</option>
               <option value="2032">2032</option>
             </select>
          </div>
        </div>

        <div class="flex items-center gap-2 mt-2">
          <input type="checkbox" id="isDefault" [(ngModel)]="pmIsDefault" class="rounded border-input text-primary focus:ring-primary h-4 w-4">
          <label for="isDefault" class="text-sm font-medium leading-none">Set as default payment method</label>
        </div>
      </div>
      <div modal-footer class="mt-4 gap-2 flex w-full justify-between">
        <div>
          @if (editingPaymentId() !== null) {
             <app-button variant="ghost" class="text-destructive hover:text-destructive hover:bg-destructive/10" (click)="deletePaymentMethod()">Delete</app-button>
          }
        </div>
        <div class="flex gap-2">
          <app-button variant="outline" (click)="closePaymentModal()">Cancel</app-button>
          <app-button (click)="savePaymentMethod()" [disabled]="!pmCardNumber() && !editingPaymentId()">
            {{ editingPaymentId() ? 'Save Changes' : 'Add Card' }}
          </app-button>
        </div>
      </div>
    </app-modal>

  `
})
export class SettingsComponent {

  // Navigation State
  activeTab = signal<SettingsTab>('profile');

  readonly tabs: { id: SettingsTab; label: string; icon: string }[] = [
    { id: 'profile', label: 'Profile', icon: 'user' },
    { id: 'security', label: 'Security', icon: 'shield' },
    { id: 'notifications', label: 'Notifications', icon: 'bell' },
    { id: 'billing', label: 'Billing', icon: 'credit-card' },
  ];


  // Payment Methods Data
  paymentMethods = signal([
    { id: 'pm_1', type: 'Visa', last4: '4242', expiryMonth: '12', expiryYear: '2028', isDefault: true }
  ]);

  // Payment Modal State
  isPaymentModalOpen = signal(false);
  editingPaymentId = signal<string | null>(null);

  pmCardNumber = signal('');
  pmExpiryMonth = signal('12');
  pmExpiryYear = signal('2028');
  pmIsDefault = signal(false);

  openAddPaymentModal() {
    this.editingPaymentId.set(null);
    this.pmCardNumber.set('');
    this.pmExpiryMonth.set('12');
    this.pmExpiryYear.set('2028');
    this.pmIsDefault.set(this.paymentMethods().length === 0); // Check default if first card
    this.isPaymentModalOpen.set(true);
  }

  openEditPaymentModal(pm: any) {
    this.editingPaymentId.set(pm.id);
    this.pmCardNumber.set(`•••• •••• •••• ${pm.last4}`);
    this.pmExpiryMonth.set(pm.expiryMonth);
    this.pmExpiryYear.set(pm.expiryYear);
    this.pmIsDefault.set(pm.isDefault);
    this.isPaymentModalOpen.set(true);
  }

  closePaymentModal() {
    this.isPaymentModalOpen.set(false);
  }

  savePaymentMethod() {
    const editId = this.editingPaymentId();
    let currentMethods = [...this.paymentMethods()];
    
    if (this.pmIsDefault()) {
      // Unset default on all others if setting this one to default
      currentMethods = currentMethods.map(pm => ({ ...pm, isDefault: false }));
    }

    if (editId) {
      currentMethods = currentMethods.map(pm => {
        if (pm.id === editId) {
          return {
            ...pm,
            expiryMonth: this.pmExpiryMonth(),
            expiryYear: this.pmExpiryYear(),
            isDefault: this.pmIsDefault() || (currentMethods.length === 1) // Always true if only card
          };
        }
        return pm;
      });
    } else {
      // Simulate last 4 digits extraction
      const numString = this.pmCardNumber().replace(/\D/g, '');
      const last4 = numString.length >= 4 ? numString.slice(-4) : '0000';
      
      const newPm = {
        id: Math.random().toString(36).substring(2, 9),
        type: numString.startsWith('3') ? 'Amex' : numString.startsWith('5') ? 'Mastercard' : 'Visa',
        last4: last4,
        expiryMonth: this.pmExpiryMonth(),
        expiryYear: this.pmExpiryYear(),
        isDefault: this.pmIsDefault() || (currentMethods.length === 0)
      };
      
      currentMethods.push(newPm);
    }
    
    // Ensure at least one default exists if there are cards
    if (currentMethods.length > 0 && !currentMethods.some(pm => pm.isDefault)) {
      currentMethods[0].isDefault = true;
    }

    this.paymentMethods.set(currentMethods);
    this.closePaymentModal();
  }

  deletePaymentMethod() {
    const editId = this.editingPaymentId();
    if (editId) {
      let currentMethods = this.paymentMethods().filter(pm => pm.id !== editId);
      
      // Re-assign default if necessary
      if (currentMethods.length > 0 && !currentMethods.some(pm => pm.isDefault)) {
        currentMethods[0].isDefault = true;
      }
      
      this.paymentMethods.set(currentMethods);
      this.closePaymentModal();
    }
  }

  // Data States
  profile = signal({
    firstName: 'Tom',
    lastName: 'Developer',
    email: 'tom@example.com',
    username: 'tomdev',
    bio: 'Frontend enthusiast building interactive dashboards. Open to collaboration.',
    website: 'https://angular.io',
    location: 'San Francisco, CA'
  });

  tfaEnabled = signal(true);

  notifs = signal({
    product: true,
    marketing: false
  });

  // Derived / Computed State
  initials = computed(() => {
    const f = this.profile().firstName?.charAt(0) || '';
    const l = this.profile().lastName?.charAt(0) || '';
    return (f + l).toUpperCase() || 'U';
  });

  // UI States
  saving = signal(false);

  // Actions
  updateProfile(field: 'firstName' | 'lastName' | 'username' | 'bio' | 'website' | 'location', event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.profile.update(p => ({ ...p, [field]: val }));
  }

  updateNotifs(field: 'product' | 'marketing') {
    this.notifs.update(n => ({ ...n, [field]: !n[field] }));
  }

  save(section: string) {
    this.saving.set(true);
    setTimeout(() => {
      this.saving.set(false);
      console.log(`Saved ${section} settings`);
    }, 800);
  }
}
