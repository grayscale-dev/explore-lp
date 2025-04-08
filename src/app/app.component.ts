import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonTab, IonTabs, IonTabBar, IonTabButton, IonIcon } from '@ionic/angular/standalone';
import { faHome, faCloud, faWater, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WeatherComponent } from './pages/weather/weather.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, FontAwesomeModule, IonHeader, IonToolbar, IonTitle, IonContent, IonTab, IonTabs, IonTabBar, IonTabButton, WeatherComponent],
})
export class AppComponent {
  faHome = faHome
  faCloud = faCloud
  faWater = faWater
  faLayerGroup = faLayerGroup
}
