import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideDynamicIcon } from '@lucide/angular';
import { CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent, CardDescriptionComponent } from '../../shared/components/card/card.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';

@Component({
  selector: 'app-modals-demo',
  standalone: true,
  imports: [
    CommonModule,
    LucideDynamicIcon,
    CardComponent,
    CardContentComponent,
    CardHeaderComponent,
    CardTitleComponent,
    CardDescriptionComponent,
    ButtonComponent,
    ModalComponent
  ],
  template: `
    <div class="flex-1 space-y-4">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Modals & Dialogs</h1>
        <p class="text-muted-foreground mt-1">
          Accessible, highly customizable modal dialogs capable of handling complex UI layouts.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <!-- Interactive Form -->
        <app-card>
          <app-card-header>
            <app-card-title>Data Entry Form</app-card-title>
            <app-card-description>Standard forms with simulated saving states.</app-card-description>
          </app-card-header>
          <app-card-content class="flex items-center gap-4">
            <app-button variant="default" (click)="isFormModalOpen.set(true)">
              <svg lucideIcon="plus" class="mr-2 h-4 w-4"></svg>
              Create Project
            </app-button>
          </app-card-content>
        </app-card>

        <!-- Destructive Action -->
        <app-card>
          <app-card-header>
            <app-card-title>Destructive Action</app-card-title>
            <app-card-description>Confirmation dialogs requiring user intent validation.</app-card-description>
          </app-card-header>
          <app-card-content class="flex items-center gap-4">
            <app-button variant="destructive" (click)="isDangerModalOpen.set(true)">Delete Resource</app-button>
          </app-card-content>
        </app-card>

        <!-- Subscription/Pricing Upgrade -->
        <app-card>
          <app-card-header>
            <app-card-title>Pricing / Upgrade</app-card-title>
            <app-card-description>Complex internal layouts like pricing tiers.</app-card-description>
          </app-card-header>
          <app-card-content class="flex items-center gap-4">
            <app-button variant="outline" class="border-primary text-primary hover:bg-primary/10" (click)="isUpgradeModalOpen.set(true)">
              <svg lucideIcon="sun" class="mr-2 h-4 w-4"></svg>
              Upgrade to Pro
            </app-button>
          </app-card-content>
        </app-card>

        <!-- Success/Feedback -->
        <app-card>
          <app-card-header>
            <app-card-title>Success Feedback</app-card-title>
            <app-card-description>Centrally aligned content for positive feedback loops.</app-card-description>
          </app-card-header>
          <app-card-content class="flex items-center gap-4">
            <app-button variant="secondary" (click)="isSuccessModalOpen.set(true)">
              <svg lucideIcon="check-circle" class="mr-2 h-4 w-4"></svg>
              Trigger Success
            </app-button>
          </app-card-content>
        </app-card>
        
        <!-- Multi-step Wizard -->
        <app-card class="md:col-span-2 lg:col-span-2">
          <app-card-header>
            <app-card-title>Multi-step Wizard</app-card-title>
            <app-card-description>Dynamic content projection mapped to internal step state. Perfect for onboarding setups.</app-card-description>
          </app-card-header>
          <app-card-content class="flex items-center gap-4">
            <app-button (click)="openWizard()">
              <svg lucideIcon="layout-dashboard" class="mr-2 h-4 w-4"></svg>
              Start Setup Walkthrough
            </app-button>
          </app-card-content>
        </app-card>

      </div>
    </div>

    <!-- 1. Form Modal -->
    <app-modal
      [isOpen]="isFormModalOpen()"
      (close)="isFormModalOpen.set(false)"
      title="Create new project"
      description="Add a new project to start tracking your user analytics."
    >
      <div class="grid gap-4 py-4">
        <div class="grid gap-2">
          <label for="name" class="text-sm font-medium leading-none">Project Name</label>
          <input
            id="name"
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            placeholder="e.g. My Awesome App"
            [value]="projectName()"
            (input)="updateProjectName($event)"
          />
        </div>
        <div class="grid gap-2">
          <label for="framework" class="text-sm font-medium leading-none">Framework</label>
          <select 
            id="framework"
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="angular">Angular</option>
            <option value="react">React</option>
            <option value="vue">Vue</option>
          </select>
        </div>
      </div>
      <div modal-footer class="mt-4 gap-2 sm:mt-0 flex">
        <app-button variant="outline" (click)="isFormModalOpen.set(false)">Cancel</app-button>
        <app-button 
          (click)="saveProject()"
          [disabled]="projectName().trim().length === 0 || isSavingProject()"
        >
          @if (isSavingProject()) {
            <svg lucideIcon="loader-2" class="mr-2 h-4 w-4 animate-spin"></svg>
            Creating...
          } @else {
            Create Project
          }
        </app-button>
      </div>
    </app-modal>

    <!-- 2. Destructive Modal -->
    <app-modal
      [isOpen]="isDangerModalOpen()"
      (close)="isDangerModalOpen.set(false)"
      [closeOnBackdropClick]="false"
      title="Are you absolutely sure?"
      description="This action cannot be undone. This will permanently delete your account and remove your configuration."
    >
      <div class="bg-destructive/10 text-destructive text-sm font-medium p-3 rounded-md border border-destructive/20 mt-4 mb-2">
        <div class="flex items-start gap-3">
          <svg lucideIcon="bell" class="h-5 w-5 mt-0.5 shrink-0"></svg>
          <p>You will lose all your configured projects, active forms, and tracked analytics data immediately.</p>
        </div>
      </div>
      <div modal-footer class="mt-6 gap-2 sm:mt-0 flex">
        <app-button variant="outline" (click)="isDangerModalOpen.set(false)">Cancel</app-button>
        <app-button variant="destructive" (click)="executeDeletion()">
          @if (isDeleting()) {
            <svg lucideIcon="loader-2" class="mr-2 h-4 w-4 animate-spin"></svg>
            Deleting...
          } @else {
            Yes, Delete Account
          }
        </app-button>
      </div>
    </app-modal>

    <!-- 3. Upgrade / Pricing Modal -->
    <app-modal
      [isOpen]="isUpgradeModalOpen()"
      (close)="isUpgradeModalOpen.set(false)"
      title="Unlock Pro Features"
      description="Upgrade your workspace to access advanced analytics and priority support."
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
        <!-- Starter Plan -->
        <div class="border rounded-lg p-4 flex flex-col items-start gap-2 bg-muted/30">
          <h3 class="font-bold text-lg">Starter</h3>
          <p class="text-3xl font-extrabold mb-2">$0<span class="text-sm font-normal text-muted-foreground">/mo</span></p>
          <ul class="text-sm space-y-2 mb-4 text-muted-foreground flex-1">
            <li class="flex items-center"><svg lucideIcon="check" class="h-4 w-4 text-primary mr-2"></svg> Up to 3 projects</li>
            <li class="flex items-center"><svg lucideIcon="check" class="h-4 w-4 text-primary mr-2"></svg> Basic Analytics</li>
          </ul>
          <span class="text-sm font-medium text-muted-foreground w-full text-center py-2 bg-muted rounded-md display-block">Current Plan</span>
        </div>
        
        <!-- Pro Plan -->
        <div class="border-2 border-primary rounded-lg p-4 flex flex-col items-start gap-2 relative shadow-sm">
          <span class="absolute -top-3 right-4 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Most Popular</span>
          <h3 class="font-bold text-lg text-primary">Pro</h3>
          <p class="text-3xl font-extrabold mb-2">$29<span class="text-sm font-normal text-muted-foreground">/mo</span></p>
          <ul class="text-sm space-y-2 mb-4 text-muted-foreground flex-1">
            <li class="flex text-foreground font-medium items-center"><svg lucideIcon="check" class="h-4 w-4 text-primary mr-2"></svg> Unlimited projects</li>
            <li class="flex text-foreground font-medium items-center"><svg lucideIcon="check" class="h-4 w-4 text-primary mr-2"></svg> Advanced Analytics</li>
            <li class="flex text-foreground font-medium items-center"><svg lucideIcon="check" class="h-4 w-4 text-primary mr-2"></svg> Priority Support</li>
          </ul>
          <app-button class="w-full" (click)="isUpgradeModalOpen.set(false)">Upgrade Now</app-button>
        </div>
      </div>
      <div modal-footer class="mt-2 flex justify-center w-full">
         <p class="text-xs text-muted-foreground text-center">By upgrading, you agree to our Terms of Service. You can cancel at any time.</p>
      </div>
    </app-modal>

    <!-- 4. Success Modal -->
    <app-modal
      [isOpen]="isSuccessModalOpen()"
      (close)="isSuccessModalOpen.set(false)"
      [showCloseButton]="false"
    >
      <div class="flex flex-col items-center justify-center text-center py-6 px-4">
        <div class="h-16 w-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-5 ring-8 ring-emerald-500/5">
          <svg lucideIcon="check-circle-2" class="h-8 w-8"></svg>
        </div>
        <h2 class="text-2xl font-bold mb-2">Payment Successful!</h2>
        <p class="text-muted-foreground text-sm mb-6 max-w-[280px]">
          Your transaction has been securely processed. A receipt has been sent to your registered email address.
        </p>
        <app-button class="w-full" (click)="isSuccessModalOpen.set(false)">Return to Dashboard</app-button>
      </div>
    </app-modal>

    <!-- 5. Multi-Step Wizard Modal -->
    <app-modal
      [isOpen]="isWizardModalOpen()"
      (close)="closeWizard()"
      [title]="wizardTitle()"
      [description]="wizardDescription()"
    >
      <div class="py-6 min-h-[160px]">
        <!-- Progress Bar -->
        <div class="w-full bg-muted rounded-full h-2 mb-6 overlow-hidden">
          <div class="bg-primary h-2 rounded-full transition-all duration-300" [style.width]="(wizardStep() / 3) * 100 + '%'"></div>
        </div>

        <!-- Step content projection via structural control flow -->
        @if (wizardStep() === 1) {
          <div class="animate-in fade-in slide-in-from-right-4 duration-300">
            <h3 class="font-semibold text-lg mb-4">Let's set up your profile</h3>
            <div class="grid gap-3">
              <input type="text" placeholder="First Name" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"/>
              <input type="text" placeholder="Company Name" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"/>
            </div>
          </div>
        } 
        
        @if (wizardStep() === 2) {
          <div class="animate-in fade-in slide-in-from-right-4 duration-300">
            <h3 class="font-semibold text-lg mb-4">Invite your team</h3>
            <div class="grid gap-3">
              <div class="flex gap-2">
                <input type="email" placeholder="colleague@company.com" class="flex-1 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"/>
                <app-button variant="secondary">Invite</app-button>
              </div>
              <p class="text-xs text-muted-foreground mt-2">You can always invite more people later from your settings tab.</p>
            </div>
          </div>
        }

        @if (wizardStep() === 3) {
          <div class="animate-in fade-in zoom-in-95 duration-300 flex flex-col items-center justify-center text-center pt-2">
            <div class="h-12 w-12 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-3">
              <svg lucideIcon="sun" class="h-6 w-6"></svg>
            </div>
            <h3 class="font-semibold text-xl mb-1">You're all set!</h3>
            <p class="text-sm text-muted-foreground">Your workspace is configured and ready to go.</p>
          </div>
        }
      </div>

      <div modal-footer class="mt-4 flex justify-between w-full border-t pt-4">
        <app-button variant="ghost" (click)="closeWizard()" class="text-muted-foreground">Skip</app-button>
        <div class="flex gap-2">
          @if (wizardStep() > 1 && wizardStep() < 3) {
            <app-button variant="outline" (click)="wizardStep.set(wizardStep() - 1)">Back</app-button>
          }
          
          @if (wizardStep() < 3) {
            <app-button (click)="wizardStep.set(wizardStep() + 1)">Continue</app-button>
          } @else {
            <app-button (click)="closeWizard()">Go to Dashboard</app-button>
          }
        </div>
      </div>
    </app-modal>
  `
})
export class ModalsComponent {
  // Visiblity Signals
  isDangerModalOpen = signal(false);
  isFormModalOpen = signal(false);
  isUpgradeModalOpen = signal(false);
  isSuccessModalOpen = signal(false);
  isWizardModalOpen = signal(false);

  // Form states
  projectName = signal('');
  isDeleting = signal(false);
  isSavingProject = signal(false);

  // Wizard States
  wizardStep = signal(1);

  wizardTitle = computed(() => {
     if (this.wizardStep() === 3) return 'Setup Complete';
     return `Workspace Setup (Step ${this.wizardStep()} of 3)`;
  });

  wizardDescription = computed(() => {
     if (this.wizardStep() === 3) return '';
     return 'Configure your environment to get the most out of the platform.';
  });

  openWizard() {
    this.wizardStep.set(1);
    this.isWizardModalOpen.set(true);
  }

  closeWizard() {
    this.isWizardModalOpen.set(false);
    setTimeout(() => this.wizardStep.set(1), 300); // reset after animation
  }

  updateProjectName(event: Event) {
    this.projectName.set((event.target as HTMLInputElement).value);
  }

  executeDeletion() {
    this.isDeleting.set(true);
    setTimeout(() => {
      this.isDeleting.set(false);
      this.isDangerModalOpen.set(false);
    }, 1200);
  }

  saveProject() {
    this.isSavingProject.set(true);
    setTimeout(() => {
      this.isSavingProject.set(false);
      this.isFormModalOpen.set(false);
      this.projectName.set('');
    }, 1000);
  }
}
