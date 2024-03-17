import { Component, Input } from '@angular/core';
import { Hero } from '../interfaces/hero';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../services/hero.service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent {
  hero!: Hero;
  heroId = 0;
  heroName = 'new';
  public idConfirm = false;
  subscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.subscription = this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
    this.heroId = id;
    this.heroName = this.hero.name;
    
    if (this.heroId == 0){
      this.hero = {id : this.heroId,name : this.heroName};
    }
  }

  save(hero: Hero): void {
    if (this.heroId == 0){
      this.heroService.createHero(hero);
    } else {
      this.hero.name = this.heroName;
    }
    this.location.back();
  }

  delete(): void {
    this.idConfirm = !this.idConfirm;
  }

  deleteconfirm(id: number): void {
    this.heroService.deleteHero(id).subscribe(
      response => {
        if (!response){
          alert('Server Error');
        }
      }      
    );
    this.location.back();
    this.idConfirm = !this.idConfirm;
  }

  deletecancel(): void {
    this.idConfirm = !this.idConfirm;
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
