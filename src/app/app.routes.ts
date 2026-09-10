import { Routes } from '@angular/router';
import { AppShellComponent } from './layout/app-shell/app-shell.component';

export const routes: Routes = [
  {
    path: '',
    component: AppShellComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard/ecommerce',
        pathMatch: 'full'
      },
      {
        path: 'dashboard/ecommerce',
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'dashboard/analytics',
        loadComponent: () => import('./features/analytics/analytics.component').then(m => m.AnalyticsComponent)
      },
      {
        path: 'forms',
        loadComponent: () => import('./features/forms/forms.component').then(m => m.FormsComponent)
      },
      {
        path: 'modals',
        loadComponent: () => import('./features/modals/modals.component').then(m => m.ModalsComponent)
      },
      {
        path: 'components/buttons',
        loadComponent: () => import('./features/components/buttons.component').then(m => m.ButtonsComponent)
      },
      {
        path: 'components/cards',
        loadComponent: () => import('./features/components/cards.component').then(m => m.CardsComponent)
      },
      {
        path: 'components/badges',
        loadComponent: () => import('./features/components/badges.component').then(m => m.BadgesComponent)
      },
      {
        path: 'components/alerts',
        loadComponent: () => import('./features/components/alerts.component').then(m => m.AlertsComponent)
      },
      {
        path: 'components/typography',
        loadComponent: () => import('./features/components/typography.component').then(m => m.TypographyComponent)
      },
      {
        path: 'components/avatars',
        loadComponent: () => import('./features/components/avatars.component').then(m => m.AvatarsComponent)
      },
      {
        path: 'components/progress',
        loadComponent: () => import('./features/components/progress.component').then(m => m.ProgressComponent)
      },
      {
        path: 'components/empty-states',
        loadComponent: () => import('./features/components/empty-states.component').then(m => m.EmptyStatesDemoComponent)
      },
      {
        path: 'components/timelines',
        loadComponent: () => import('./features/components/timelines.component').then(m => m.TimelinesDemoComponent)
      },
      {
        path: 'components/accordions',
        loadComponent: () => import('./features/components/accordion-demo.component').then(m => m.AccordionDemoComponent)
      },
      {
        path: 'data-table',
        loadComponent: () => import('./features/data-table/data-table.component').then(m => m.DataTableComponent)
      },
      {
        path: 'notifications',
        loadComponent: () => import('./features/notifications/notifications.component').then(m => m.NotificationsComponent)
      },
      {
        path: 'users',
        loadComponent: () => import('./features/users/users.component').then(m => m.UsersComponent)
      },
      {
        path: 'products',
        loadComponent: () => import('./features/products/products.component').then(m => m.ProductsComponent)
      },
      {
        path: 'documentation',
        loadComponent: () => import('./features/documentation/documentation.component').then(m => m.DocumentationComponent)
      }
    ]
  },
  {
    path: 'auth',
    loadComponent: () => import('./layout/auth-layout/auth-layout.component').then(m => m.AuthLayoutComponent),
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', loadComponent: () => import('./features/auth/login.component').then(m => m.LoginComponent) },
      { path: 'signup', loadComponent: () => import('./features/auth/signup.component').then(m => m.SignupComponent) },
      { path: 'forgot-password', loadComponent: () => import('./features/auth/forgot-password.component').then(m => m.ForgotPasswordComponent) }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
