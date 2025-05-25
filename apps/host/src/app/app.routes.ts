
import { Route } from '@angular/router';
import { loadRemote } from '@module-federation/enhanced/runtime';
import { HomeLayoutComponent } from '@popcx/ui';

export const appRoutes: Route[] = [
  {
    path: 'auth',
    loadChildren: () =>
      loadRemote<typeof import('auth/Routes')>('auth/Routes').then(
        (m) => m!.remoteRoutes
      ),
  },
  {
    path:'home',
    component:HomeLayoutComponent
  }
];
