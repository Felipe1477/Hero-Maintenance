import { Component, Input, Inject } from '@angular/core';
import { Hero } from '../interfaces/hero';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../services/hero.service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})

export class HeroDetailComponent {
  hero!: Hero;
  heroId = 0;
  heroName = 'new';
  heroAge = 0;
  public idConfirm = false;
  subscription!: Subscription;
  spinnerShow = false;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.spinnerShow = true;
    this.getHero();
    setTimeout(() => this.spinnerShow = false, 5000);
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.subscription = this.heroService.getHero(id)
      .subscribe(hero => {
        this.hero = hero;
        if (id == 0) {
          this.hero = { id: this.heroId, name: this.heroName, age: 0 };
        } else {
          this.heroName = this.hero.name;
          this.heroAge = this.hero.age;
        }
        this.heroId = id;
      });
  }

  save(hero: Hero): void {
    if (this.heroId == 0) {
      this.heroService.createHero(hero).subscribe(response => {
        if (!response) {
          alert('Server Error');
        } else {
          alert(response);
        }
      }
      );
    } else {
      this.hero.name = this.heroName;
      this.hero.age = this.heroAge;
      alert("Hero created");
    }
    this.location.back();
  }

  delete(): void {
    this.idConfirm = !this.idConfirm;
  }

  deleteconfirm(id: number): void {
    this.heroService.deleteHero(id).subscribe(
      response => {
        if (!response) {
          alert('Server Error');
        } else {
          alert(response);
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
