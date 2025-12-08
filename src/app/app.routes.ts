import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Services } from './services/services';
import { AssuranceServices } from './assurance-services/assurance-services';
import { OtherServices } from './other-services/other-services'; 

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'services', component: Services },
  { path: 'assurance_services', component: AssuranceServices },
  { path: 'other_services', component: OtherServices }
];
