import { Component, inject } from "@angular/core";
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonIcon, IonButton, IonButtons, IonRefresher, IonRefresherContent, IonList, IonItem, IonSelect, IonSelectOption, IonPopover, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from "ionicons";
import { cloud, water, chevronUp, chevronDown, partlySunny, sunny, thunderstorm, rainy, flame, snow, map } from 'ionicons/icons'
import { WeatherService } from "../../core/services/weather.service";

@Component({
    selector: 'weather-page',
    imports: [IonLabel, IonPopover, IonToolbar, IonHeader, IonTitle, IonContent, IonCard, IonIcon, IonButton, IonButtons, IonRefresher, IonRefresherContent, IonList, IonItem, IonSelect, IonSelectOption],
    templateUrl: './weather.component.html'
})

export class WeatherComponent {
    locations = [
        { name: "Wahweap Marina", coordinates: { lat: 37.010, lng: -111.480 } },
        { name: "Lone Rock Beach", coordinates: { lat: 37.055, lng: -111.493 } },
        { name: "Antelope Point", coordinates: { lat: 37.070, lng: -111.620 } },
        { name: "Warm Creek Bay", coordinates: { lat: 37.025, lng: -111.550 } },
        { name: "Padre Bay", coordinates: { lat: 37.000, lng: -111.530 } },
        { name: "Twinhorn Point", coordinates: { lat: 37.080, lng: -111.600 } },
        { name: "Rainbow Bridge", coordinates: { lat: 37.160, lng: -110.960 } },
        { name: "Buckshot Bend", coordinates: { lat: 37.090, lng: -111.650 } },
        { name: "Canyon Point", coordinates: { lat: 37.040, lng: -111.520 } },
        { name: "Sunset Point", coordinates: { lat: 37.085, lng: -111.560 } }
    ];
    location? = this.locations[0]

    weatherService = inject(WeatherService);
    constructor() {
        let selectedLocation = localStorage.getItem("selectedLocation")
        if (selectedLocation) {
          this.location = this.locations.find(loc => loc.name === selectedLocation) || this.locations[0];
        }

        addIcons({ cloud, water, chevronUp, chevronDown, partlySunny, sunny, thunderstorm, rainy, flame, snow, map })
    }

    handleRefresh(event: any) {
        this.weatherService.data.reload()
        event.target.complete()
    }

    selectLocation(location: any) {
        this.location = location;
        if (this.location) {
            localStorage.setItem("selectedLocation", this.location.name);
            this.weatherService.setCoordinates(this.location.coordinates.lat, this.location.coordinates.lng);
        }
    }
}