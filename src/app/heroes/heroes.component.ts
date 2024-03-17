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
  heroes!: Hero[];
  selectedHero!: Hero;
  subscription!: Subscription;
  displayheroes!: Hero[];
  public confirmDelete = false;
  public showDelete = false;
  public showSelected = false;

  constructor(private heroService: HeroService) { 
  }

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.showDelete = true;
    this.showSelected = true;
    this.confirmDelete = false;
  }

  getHeroes(): void {
    this.subscription = this.heroService.getHeroes()
        .subscribe(heroes => {
          this.heroes = heroes;
          this.displayheroes = this.heroes;
        });
  }

  getFilteredHeroes(filter: string): void {
    this.subscription = this.heroService.getFilteredHeroes(filter)
        .subscribe(heroes => {
          this.heroes = heroes;
          this.displayheroes = this.heroes;
        });
  }

  delete(): void {
    this.confirmDelete = !this.confirmDelete;
    
  }

  deleteconfirm(): void {
    this.heroService.deleteHero(this.selectedHero.id).subscribe(
      response => {
        if (!response){
          alert('Server Error');
        } else {
          this.getHeroes();
        }
      }      
    );
    this.confirmDelete = !this.confirmDelete;
    this.showSelected = false;
    this.showDelete = false;
  }

  deletecancel(): void {
    this.confirmDelete = !this.confirmDelete;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
