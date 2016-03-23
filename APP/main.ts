import {bootstrap}    from 'angular2/platform/browser';
import {AppComponent} from './components/TOUR_OF_HEROES/app.component';
import { enableProdMode } from 'angular2/core';

// enable production mode and thus disable debugging information
enableProdMode();

bootstrap(AppComponent, []);
