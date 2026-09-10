import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { form, FormField, validateStandardSchema } from '@angular/forms/signals';
import { z } from 'zod';
import { LucideDynamicIcon } from '@lucide/angular';
import { CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent, CardDescriptionComponent } from '../../shared/components/card/card.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

const profileSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters').max(20, 'Username cannot exceed 20 characters'),
  email: z.string().email('Please enter a valid email address'),
  website: z.string().url('Must be a valid URL').or(z.literal('')),
  birthDate: z.string(),
  bio: z.string().max(160, 'Bio must be under 160 characters'),
  role: z.enum(['Admin', 'Manager', 'Member'] as const, { message: 'Please select a role' }),
  subscriptionTier: z.enum(['Free', 'Pro', 'Enterprise'] as const),
  experience: z.number().min(0).max(100),
  notifications: z.boolean()
});

export type ProfileFormModel = z.infer<typeof profileSchema>;

@Component({
  selector: 'app-forms-demo',
  standalone: true,
  imports: [CommonModule, FormField, LucideDynamicIcon, CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent, CardDescriptionComponent, ButtonComponent],
  template: `
    <div class="flex-1 space-y-4">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Signal Forms Demo</h1>
        <p class="text-muted-foreground mt-1">
          Highlighting Angular 22's native Signal Forms API with strict Zod schema validation.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">

        <!-- Form Section -->
        <app-card class="col-span-1 lg:col-span-3 block">
          <app-card-header>
            <app-card-title>Profile Settings</app-card-title>
            <app-card-description>Update your profile information and preferences.</app-card-description>
          </app-card-header>

          <app-card-content>
            <form (submit)="onSubmit($event)" class="space-y-8">

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Username -->
                <div class="space-y-2">
                  <label class="text-sm font-medium leading-none" [class.text-destructive]="hasError('username')">Username</label>
                  <div class="relative">
                    <svg lucideIcon="user" class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"></svg>
                    <input
                      type="text"
                      [formField]="profileForm.username"
                      placeholder="johndoe"
                      class="flex h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      [class.border-destructive]="hasError('username')"
                      [class.focus-visible:ring-destructive]="hasError('username')"
                    />
                  </div>
                  @if (hasError('username')) {
                    <p class="text-[0.8rem] font-medium text-destructive">{{ getErrorMessage('username') }}</p>
                  }
                </div>

                <!-- Email -->
                <div class="space-y-2">
                  <label class="text-sm font-medium leading-none" [class.text-destructive]="hasError('email')">Email Address</label>
                  <div class="relative">
                    <svg lucideIcon="mail" class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"></svg>
                    <input
                      type="email"
                      [formField]="profileForm.email"
                      placeholder="john@example.com"
                      class="flex h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      [class.border-destructive]="hasError('email')"
                      [class.focus-visible:ring-destructive]="hasError('email')"
                    />
                  </div>
                  @if (hasError('email')) {
                    <p class="text-[0.8rem] font-medium text-destructive">{{ getErrorMessage('email') }}</p>
                  }
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Website URL -->
                <div class="space-y-2">
                  <label class="text-sm font-medium leading-none" [class.text-destructive]="hasError('website')">Personal Website</label>
                  <div class="relative">
                    <svg lucideIcon="link" class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"></svg>
                    <input
                      type="url"
                      [formField]="profileForm.website"
                      placeholder="https://your-website.com"
                      class="flex h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      [class.border-destructive]="hasError('website')"
                      [class.focus-visible:ring-destructive]="hasError('website')"
                    />
                  </div>
                  @if (hasError('website')) {
                    <p class="text-[0.8rem] font-medium text-destructive">{{ getErrorMessage('website') }}</p>
                  }
                </div>

                <!-- Date of Birth -->
                <div class="space-y-2">
                  <label class="text-sm font-medium leading-none" [class.text-destructive]="hasError('birthDate')">Date of Birth</label>
                  <div class="relative">
                    <svg lucideIcon="calendar" class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none"></svg>
                    <input
                      type="date"
                      [formField]="profileForm.birthDate"
                      class="flex h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [color-scheme:light] dark:[color-scheme:dark]"
                    />
                  </div>
                </div>
              </div>

              <!-- Radio Group (Subscription Tier) -->
              <div class="space-y-3">
                <div class="space-y-1">
                  <label class="text-sm font-medium leading-none">Subscription Tier</label>
                  <p class="text-[0.8rem] text-muted-foreground">Select the plan that best fits your needs.</p>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  @for (tier of ['Free', 'Pro', 'Enterprise']; track tier) {
                    <label class="cursor-pointer relative">
                      <input type="radio" [value]="tier" [formField]="profileForm.subscriptionTier" class="peer sr-only" />
                      <div class="rounded-lg border-2 border-muted bg-card hover:bg-accent hover:text-accent-foreground p-4 text-center peer-checked:border-primary peer-checked:bg-primary/5 peer-focus-visible:ring-2 peer-focus-visible:ring-ring transition-all">
                        <span class="font-medium block text-sm">{{ tier }}</span>
                      </div>
                    </label>
                  }
                </div>
              </div>

              <!-- Role Select -->
              <div class="space-y-2">
                <label class="text-sm font-medium leading-none" [class.text-destructive]="hasError('role')">Role</label>
                <select
                  [formField]="profileForm.role"
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  [class.border-destructive]="hasError('role')"
                >
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Member">Member</option>
                </select>
                @if (hasError('role')) {
                  <p class="text-[0.8rem] font-medium text-destructive">{{ getErrorMessage('role') }}</p>
                }
              </div>

              <!-- Range Slider (Angular Proficiency) -->
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <label class="text-sm font-medium leading-none">Angular Proficiency</label>
                  <span class="text-sm font-semibold text-primary font-mono bg-primary/10 px-2 py-0.5 rounded-md">{{ profileForm.experience().value() }}%</span>
                </div>
                <input
                  type="range"
                  [formField]="profileForm.experience"
                  class="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <!-- Bio Textarea -->
              <div class="space-y-2">
                <label class="text-sm font-medium leading-none" [class.text-destructive]="hasError('bio')">Bio</label>
                <textarea
                  [formField]="profileForm.bio"
                  placeholder="Tell us a little bit about yourself"
                  class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  [class.border-destructive]="hasError('bio')"
                  [class.focus-visible:ring-destructive]="hasError('bio')"
                ></textarea>
                <div class="flex justify-between items-center text-[0.8rem]">
                   @if (hasError('bio')) {
                     <span class="font-medium text-destructive">{{ getErrorMessage('bio') }}</span>
                   } @else {
                     <span class="text-muted-foreground">Brief description for your profile.</span>
                   }
                   <span class="text-muted-foreground" [class.text-destructive]="(profileForm.bio().value()?.length || 0) > 160">
                     {{ profileForm.bio().value()?.length || 0 }}/160
                   </span>
                </div>
              </div>

              <!-- Switch (Checkbox) -->
              <div class="flex flex-row items-center justify-between rounded-lg border p-4">
                <div class="space-y-0.5">
                  <label class="text-base font-medium">Marketing emails</label>
                  <p class="text-[0.8rem] text-muted-foreground">
                    Receive emails about new products, features, and more.
                  </p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" [formField]="profileForm.notifications" class="sr-only peer">
                  <div class="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-ring rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary transition-colors"></div>
                </label>
              </div>

              <div class="pt-2 flex justify-between items-center">
                <app-button type="submit" [disabled]="isSubmitting()">
                  @if (isSubmitting()) {
                    <svg lucideIcon="loader-2" class="mr-2 h-4 w-4 animate-spin"></svg>
                    Saving...
                  } @else {
                    Save Changes
                  }
                </app-button>
                @if (submitSuccess()) {
                  <span class="text-sm text-green-600 dark:text-green-600 font-medium flex items-center gap-1.5 animate-in fade-in">
                    <svg lucideIcon="check-circle" class="h-4 w-4"></svg>
                    Profile updated
                  </span>
                }
              </div>
            </form>
          </app-card-content>
        </app-card>

        <!-- Debug Information Side -->
        <div class="space-y-6 col-span-1 lg:col-span-2">

          <app-card class="block">
            <app-card-header>
              <app-card-title>Reactivity State</app-card-title>
              <app-card-description>Real-time reflection of the Signal Form model and state.</app-card-description>
            </app-card-header>
            <app-card-content>
              <div class="rounded-md bg-muted p-4 font-mono text-sm overflow-auto">
                <div class="grid grid-cols-2 gap-4 pb-4 border-b border-border/50 mb-4">
                   <div>
                     <div class="text-muted-foreground mb-1 text-xs uppercase tracking-wider">Valid</div>
                     <div class="font-medium" [class.text-green-600]="profileForm().valid()" [class.text-destructive]="profileForm().invalid()">
                       {{ profileForm().valid() }}
                     </div>
                   </div>
                   <div>
                     <div class="text-muted-foreground mb-1 text-xs uppercase tracking-wider">Touched</div>
                     <div class="font-medium" [class.text-primary]="profileForm().touched()">
                       {{ profileForm().touched() }}
                     </div>
                   </div>
                   <div>
                     <div class="text-muted-foreground mb-1 text-xs uppercase tracking-wider">Dirty</div>
                     <div class="font-medium" [class.text-primary]="profileForm().dirty()">
                       {{ profileForm().dirty() }}
                     </div>
                   </div>
                   <div>
                     <div class="text-muted-foreground mb-1 text-xs uppercase tracking-wider">Total Errors</div>
                     <div class="font-medium" [class.text-destructive]="profileForm().errorSummary().length > 0">
                       {{ profileForm().errorSummary().length }}
                     </div>
                   </div>
                </div>
                <div class="text-muted-foreground mb-2 text-xs uppercase tracking-wider">Form Model Matrix:</div>
                <pre class="text-foreground text-xs leading-relaxed max-w-full overflow-x-auto whitespace-pre-wrap">{{ formModel() | json }}</pre>
              </div>
            </app-card-content>
          </app-card>

          <!-- Input Examples Hint -->
          <app-card class="block bg-primary/5 border-primary/20">
            <app-card-header class="pb-3">
              <app-card-title class="text-base">Input Capabilities</app-card-title>
            </app-card-header>
            <app-card-content class="text-sm text-muted-foreground space-y-2">
              <p>This form demonstrates two-way data bindings mapping directly between Tailwind UI and the underlying Zod-schema Model containing:</p>
              <ul class="list-disc pl-5 space-y-1">
                <li><span class="font-medium text-foreground">Radio Groups</span> (via CSS peer checked)</li>
                <li><span class="font-medium text-foreground">Custom Toggles</span> (hidden checkbox)</li>
                <li><span class="font-medium text-foreground">Range Sliders</span> (real-time percentage mapping)</li>
                <li><span class="font-medium text-foreground">Dates & URLs</span> (HTML5 native inputs)</li>
                <li><span class="font-medium text-foreground">Select dropdowns</span></li>
              </ul>
            </app-card-content>
          </app-card>

        </div>
      </div>
    </div>
  `
})
export class FormsComponent {
  formModel = signal<ProfileFormModel>({
    username: '',
    email: '',
    website: '',
    birthDate: '',
    bio: '',
    role: 'Member',
    subscriptionTier: 'Free',
    experience: 50,
    notifications: true
  });

  profileForm = form(
    this.formModel,
    (path) => {
      validateStandardSchema(path, profileSchema);
    }
  );

  isSubmitting = signal(false);
  submitSuccess = signal(false);

  // Helper method to resolve field paths and simplify template
  hasError(field: keyof ProfileFormModel): boolean {
    const fieldState = (this.profileForm as any)[field]();
    // Only show error if the field has been touched or the form is dirty/submitted (using touched typically)
    return fieldState.invalid() && fieldState.touched();
  }

  getErrorMessage(field: keyof ProfileFormModel): string {
    const errors = (this.profileForm as any)[field]().errors();
    return errors.length ? (errors[0].message ?? 'Invalid field') : '';
  }

  onSubmit(e: Event) {
    e.preventDefault();

    if (this.profileForm().invalid()) {
      return;
    }

    this.isSubmitting.set(true);
    this.submitSuccess.set(false);

    setTimeout(() => {
      this.isSubmitting.set(false);
      this.submitSuccess.set(true);
      setTimeout(() => this.submitSuccess.set(false), 3000);

      console.log('Submitted Payload:', this.formModel());
    }, 1000);
  }
}
