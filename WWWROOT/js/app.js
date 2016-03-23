var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
System.register("COMPONENTS/TOUR_OF_HEROES/mock-heroes", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var HEROES;
    return {
        setters:[],
        execute: function() {
            exports_1("HEROES", HEROES = [
                { "id": 11, "name": "Mr. Nice" },
                { "id": 12, "name": "Narco" },
                { "id": 13, "name": "Bombasto" },
                { "id": 14, "name": "Celeritas" },
                { "id": 15, "name": "Magneta" },
                { "id": 16, "name": "RubberMan" },
                { "id": 17, "name": "Dynama" },
                { "id": 18, "name": "Dr IQ" },
                { "id": 19, "name": "Magma" },
                { "id": 20, "name": "Tornado" }
            ]);
        }
    }
});
System.register("COMPONENTS/TOUR_OF_HEROES/hero.service", ['angular2/core', "COMPONENTS/TOUR_OF_HEROES/mock-heroes"], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var core_1, mock_heroes_1;
    var HeroService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (mock_heroes_1_1) {
                mock_heroes_1 = mock_heroes_1_1;
            }],
        execute: function() {
            HeroService = (function () {
                function HeroService() {
                }
                HeroService.prototype.getHeroes = function () {
                    return Promise.resolve(mock_heroes_1.HEROES);
                };
                HeroService.prototype.getHero = function (id) {
                    return Promise.resolve(mock_heroes_1.HEROES).then(function (heroes) { return heroes.filter(function (h) { return h.id === id; })[0]; });
                };
                HeroService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], HeroService);
                return HeroService;
            }());
            exports_2("HeroService", HeroService);
        }
    }
});
System.register("COMPONENTS/TOUR_OF_HEROES/hero-detail.component", ['angular2/core', 'angular2/router', "COMPONENTS/TOUR_OF_HEROES/hero.service"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var core_2, router_1, hero_service_1;
    var HeroDetailComponent;
    return {
        setters:[
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (hero_service_1_1) {
                hero_service_1 = hero_service_1_1;
            }],
        execute: function() {
            HeroDetailComponent = (function () {
                function HeroDetailComponent(_heroService, _routeParams) {
                    this._heroService = _heroService;
                    this._routeParams = _routeParams;
                }
                HeroDetailComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (!this.hero) {
                        var id = +this._routeParams.get('id');
                        this._heroService.getHero(id).then(function (hero) { return _this.hero = hero; });
                    }
                };
                __decorate([
                    core_2.Input(), 
                    __metadata('design:type', Object)
                ], HeroDetailComponent.prototype, "hero", void 0);
                HeroDetailComponent = __decorate([
                    core_2.Component({
                        selector: 'my-hero-detail',
                        templateUrl: 'APP/COMPONENTS/TOUR_OF_HEROES/hero-detail.component.html',
                        styleUrls: ['APP/COMPONENTS/TOUR_OF_HEROES/hero-detail.component.css'],
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [hero_service_1.HeroService, router_1.RouteParams])
                ], HeroDetailComponent);
                return HeroDetailComponent;
            }());
            exports_3("HeroDetailComponent", HeroDetailComponent);
        }
    }
});
System.register("COMPONENTS/TOUR_OF_HEROES/heroes.component", ['angular2/core', 'angular2/router', "COMPONENTS/TOUR_OF_HEROES/hero.service", "COMPONENTS/TOUR_OF_HEROES/hero-detail.component"], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var core_3, router_2, hero_service_2, hero_detail_component_1;
    var HeroesComponent;
    return {
        setters:[
            function (core_3_1) {
                core_3 = core_3_1;
            },
            function (router_2_1) {
                router_2 = router_2_1;
            },
            function (hero_service_2_1) {
                hero_service_2 = hero_service_2_1;
            },
            function (hero_detail_component_1_1) {
                hero_detail_component_1 = hero_detail_component_1_1;
            }],
        execute: function() {
            HeroesComponent = (function () {
                function HeroesComponent(_heroService, _router) {
                    this._heroService = _heroService;
                    this._router = _router;
                }
                HeroesComponent.prototype.getHeroes = function () {
                    var _this = this;
                    this.selectedHero = undefined;
                    this.heroes = [];
                    this._heroService.getHeroes().then(function (heroes) { return _this.heroes = heroes; });
                    return this.heroes;
                };
                HeroesComponent.prototype.gotoDetail = function () {
                    this._router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
                };
                HeroesComponent.prototype.ngOnInit = function () {
                    this.heroes = this.getHeroes();
                };
                HeroesComponent.prototype.onSelect = function (hero) {
                    this.selectedHero = hero;
                };
                HeroesComponent = __decorate([
                    core_3.Component({
                        selector: 'my-heroes',
                        templateUrl: 'APP/COMPONENTS/TOUR_OF_HEROES/heroes.component.html',
                        styleUrls: ['APP/COMPONENTS/TOUR_OF_HEROES/heroes.component.css'],
                        directives: [hero_detail_component_1.HeroDetailComponent]
                    }), 
                    __metadata('design:paramtypes', [hero_service_2.HeroService, router_2.Router])
                ], HeroesComponent);
                return HeroesComponent;
            }());
            exports_4("HeroesComponent", HeroesComponent);
        }
    }
});
System.register("COMPONENTS/TOUR_OF_HEROES/dashboard.component", ['angular2/core', 'angular2/router', "COMPONENTS/TOUR_OF_HEROES/hero.service"], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var core_4, router_3, hero_service_3;
    var DashboardComponent;
    return {
        setters:[
            function (core_4_1) {
                core_4 = core_4_1;
            },
            function (router_3_1) {
                router_3 = router_3_1;
            },
            function (hero_service_3_1) {
                hero_service_3 = hero_service_3_1;
            }],
        execute: function() {
            DashboardComponent = (function () {
                function DashboardComponent(_heroService, _router) {
                    this._heroService = _heroService;
                    this._router = _router;
                    this.heroes = [];
                }
                DashboardComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._heroService.getHeroes().then(function (heroes) { return _this.heroes = heroes.slice(1, 5); });
                };
                DashboardComponent.prototype.gotoDetail = function (hero) {
                    this._router.navigate(['HeroDetail', { id: hero.id }]);
                };
                DashboardComponent = __decorate([
                    core_4.Component({
                        selector: 'my-dashboard',
                        templateUrl: 'APP/COMPONENTS/TOUR_OF_HEROES/dashboard.component.html',
                        styleUrls: ['APP/COMPONENTS/TOUR_OF_HEROES/dashboard.component.css']
                    }), 
                    __metadata('design:paramtypes', [hero_service_3.HeroService, router_3.Router])
                ], DashboardComponent);
                return DashboardComponent;
            }());
            exports_5("DashboardComponent", DashboardComponent);
        }
    }
});
System.register("COMPONENTS/TOUR_OF_HEROES/app.component", ['angular2/core', 'angular2/router', "COMPONENTS/TOUR_OF_HEROES/heroes.component", "COMPONENTS/TOUR_OF_HEROES/hero-detail.component", "COMPONENTS/TOUR_OF_HEROES/dashboard.component", "COMPONENTS/TOUR_OF_HEROES/hero.service"], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var core_5, router_4, heroes_component_1, hero_detail_component_2, dashboard_component_1, hero_service_4;
    var AppComponent;
    return {
        setters:[
            function (core_5_1) {
                core_5 = core_5_1;
            },
            function (router_4_1) {
                router_4 = router_4_1;
            },
            function (heroes_component_1_1) {
                heroes_component_1 = heroes_component_1_1;
            },
            function (hero_detail_component_2_1) {
                hero_detail_component_2 = hero_detail_component_2_1;
            },
            function (dashboard_component_1_1) {
                dashboard_component_1 = dashboard_component_1_1;
            },
            function (hero_service_4_1) {
                hero_service_4 = hero_service_4_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.title = 'Tour of Heroes';
                }
                AppComponent = __decorate([
                    core_5.Component({
                        selector: 'my-app',
                        template: "\n    <h1>{{title}}</h1>\n    <nav>\n      <a [routerLink]=\"['Dashboard']\">Dashboard</a>\n      <a [routerLink]=\"['Heroes']\">Heroes</a>\n    </nav>\n    <router-outlet></router-outlet>\n  ",
                        styleUrls: ['APP/COMPONENTS/TOUR_OF_HEROES/app.component.css'],
                        directives: [router_4.ROUTER_DIRECTIVES],
                        providers: [hero_service_4.HeroService, router_4.ROUTER_PROVIDERS]
                    }),
                    router_4.RouteConfig([
                        { path: '/dashboard', name: 'Dashboard', component: dashboard_component_1.DashboardComponent, useAsDefault: true },
                        { path: '/heroes', name: 'Heroes', component: heroes_component_1.HeroesComponent },
                        { path: '/detail/:id', name: 'HeroDetail', component: hero_detail_component_2.HeroDetailComponent }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_6("AppComponent", AppComponent);
        }
    }
});
System.register("main", ['angular2/platform/browser', "COMPONENTS/TOUR_OF_HEROES/app.component", 'angular2/core'], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var browser_1, app_component_1, core_6;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (core_6_1) {
                core_6 = core_6_1;
            }],
        execute: function() {
            // enable production mode and thus disable debugging information
            core_6.enableProdMode();
            browser_1.bootstrap(app_component_1.AppComponent, []);
        }
    }
});
