import { Component } from "@angular/core";
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';

@Component({
    selector: 'weather-page',
    imports: [IonToolbar, IonHeader, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle],
    templateUrl: './weather.component.html'
})

export class WeatherComponent {
    
}