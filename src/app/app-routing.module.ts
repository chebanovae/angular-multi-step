import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'process', loadChildren: './process/process.module#ProcessModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
