import { Route } from '@angular/router';

export const appRoutes: Route[] = [];

const routes: Routes = [
  { path: 'first-component', component: FirstComponent },
  { path: 'second-component', component: SecondComponent },
  { path: '**', component: PageNotFoundComponent }, // Wildcard route for a 404 page
];
