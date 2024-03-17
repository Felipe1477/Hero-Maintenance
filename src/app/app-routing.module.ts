import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroFilterComponent } from './hero-filter/hero-filter.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

const routes: Routes = [
  
  { path: 'heroes-filter', component: HeroFilterComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: '', redirectTo: 'heroes-filter', pathMatch: 'full' },
  { path: '**', redirectTo: 'heroes-filter', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
