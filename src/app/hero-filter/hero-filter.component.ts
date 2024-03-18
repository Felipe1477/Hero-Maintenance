import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HeroesComponent } from '../heroes/heroes.component';

@Component({
  selector: 'app-hero-filter',
  templateUrl: './hero-filter.component.html',
  styleUrls: ['./hero-filter.component.scss']
})
export class HeroFilterComponent {
  name = new FormControl('');
  @ViewChild(HeroesComponent) childHero!: HeroesComponent;
  namefilter: string = '';
  spinnerShow = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.spinnerShow = true;
    setTimeout(() => this.spinnerShow = false, 1500);
   }

  createNewHero() {
    this.router.navigate(['detail/0']);
  }

  filterHero() {
    this.childHero.getFilteredHeroes(this.namefilter);
  }

  cleanFilter() {
    this.childHero.getHeroes();
  }

  EditHero() {
    if (this.childHero.selectedHero) {
      let selectedHeroId = this.childHero.selectedHero.id;
      this.router.navigate(['detail/' + selectedHeroId]);
    } else {
      alert("No Hero Selected");
    }
  }



}
