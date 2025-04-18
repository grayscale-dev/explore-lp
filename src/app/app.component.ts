import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonTab, IonTabs, IonTabBar, IonTabButton, IonIcon } from '@ionic/angular/standalone';
import { faHome, faCloud, faWater, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WeatherComponent } from './pages/weather/weather.component';
import { addIcons } from 'ionicons';
import { home, cloud, water, grid } from 'ionicons/icons';
import { WaterPageComponent } from "./pages/water/water.component";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonIcon, FontAwesomeModule, IonHeader, IonToolbar, IonTitle, IonContent, IonTab, IonTabs, IonTabBar, IonTabButton, WeatherComponent, WaterPageComponent],
})
export class AppComponent {
  constructor() {
    addIcons({ home, cloud, water, grid })
  }
}
