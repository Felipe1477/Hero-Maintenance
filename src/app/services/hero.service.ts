import { Injectable } from '@angular/core';
import { Hero } from '../interfaces/hero';
import { HEROES } from '../mockData/heroes-data';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor() { }

  getHeroes(): Observable<Hero[]> {
    return of(HEROES);
  }

  getHero(id: number): Observable<Hero> {
    const hero = HEROES.find(h => h.id === id)!;
    return of(hero);
  }

  createHero(hero: Hero): Observable<String>  {
    let params = JSON.stringify(hero);
    let lastIndex = HEROES[HEROES.length-1].id;
    hero.id = lastIndex + 1
    HEROES.push(hero);
    return of('Hero Added');
  }

  deleteHero(id: number): Observable<String>  {
    return of('Hero Delete');
  }

}
