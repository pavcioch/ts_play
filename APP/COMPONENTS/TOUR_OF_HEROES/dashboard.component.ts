import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';
import { Hero, HeroService } from './hero.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: 'APP/COMPONENTS/TOUR_OF_HEROES/dashboard.component.html',
  styleUrls: ['APP/COMPONENTS/TOUR_OF_HEROES/dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public heroes: Hero[] = [];

  constructor(private _heroService: HeroService, private _router: Router) { }

  ngOnInit() {
    this._heroService.getHeroes().then(heroes => this.heroes = heroes.slice(1, 5));
  }

  gotoDetail(hero: Hero) {
    this._router.navigate(['HeroDetail', { id: hero.id }]);
  }
}