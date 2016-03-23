import { Component, Input, OnInit } from 'angular2/core';
import { RouteParams, ROUTER_DIRECTIVES } from 'angular2/router';
import { Hero, HeroService } from './hero.service';

@Component({
  selector: 'my-hero-detail',
  templateUrl: 'APP/COMPONENTS/TOUR_OF_HEROES/hero-detail.component.html',
  styleUrls: ['APP/COMPONENTS/TOUR_OF_HEROES/hero-detail.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  constructor(private _heroService: HeroService,
    private _routeParams: RouteParams) {
  }

  ngOnInit() {
    if (!this.hero) {
      let id = +this._routeParams.get('id');
      this._heroService.getHero(id).then(hero => this.hero = hero);
    }
  }
}
