
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './main/login/login.component';

const appRoutes: Routes = [
     { path: 'login', component: LoginComponent },
     // { path: 'path', component: FeatureComponent },
     { path: '**', component: LoginComponent },
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );
