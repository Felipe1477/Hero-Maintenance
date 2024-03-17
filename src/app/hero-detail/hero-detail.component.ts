import { Component, Input } from '@angular/core';
import { Hero } from '../interfaces/hero';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../services/hero.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent {
  hero!: Hero;
  heroId!: number
  public idConfirm!: number;

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
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
    this.heroId = id;
    
    if (this.heroId == 0){
      this.hero = {id : 0,name : 'new'};
    }
  }

  save(hero: Hero): void {
    if (this.heroId == 0){
      this.heroService.createHero(hero);
    }
    this.location.back();
  }

  delete(id: number): void {
    this.idConfirm = id;
    this.location.back();
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
  }

  deletecancel(): void {
    this.location.back();
  }

  goBack(): void {
    this.location.back();
  }


}
