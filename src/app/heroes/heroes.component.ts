import { Component } from '@angular/core';
import { Hero } from '../interfaces/hero';
import { Subscription } from 'rxjs';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent {
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  heroes!: Hero[];
  selectedHero!: Hero;
  subscription!: Subscription;

  constructor(private heroService: HeroService) { 
  }

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  getHeroes(): void {
    this.subscription = this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

  delete(id : number){

  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
