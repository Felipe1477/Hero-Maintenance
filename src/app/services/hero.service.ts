import { Injectable } from '@angular/core';
import { Hero } from '../interfaces/hero';
import { HEROES } from '../mockData/heroes-data';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  Heroesdata = HEROES;
  newHeroes! : Hero[];

  constructor() { }

  getHeroes(): Observable<Hero[]> {
    return of(this.Heroesdata);
  }

  getHero(id: number): Observable<Hero> {
    const hero = this.Heroesdata.find(h => h.id === id)!;
    return of(hero);
  }

  getFilteredHeroes(filter: string): Observable<Hero[]> {
    return of(this.Heroesdata.filter((hero) => hero.name.toLowerCase().includes(filter.toLowerCase())));
  }
  

  createHero(hero: Hero): Observable<String>  {
    let lastIndex = this.Heroesdata[this.Heroesdata.length-1].id;
    hero.id = lastIndex + 1
    this.Heroesdata.push(hero);
    return of('Hero Added');
  }

  deleteHero(id: number): Observable<String> {
    this.newHeroes = this.Heroesdata.filter((hero) => hero.id != id)
    this.Heroesdata = this.newHeroes;
    return of('Hero Deleted');
  }

}
