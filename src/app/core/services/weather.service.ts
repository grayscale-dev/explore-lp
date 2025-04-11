import { Injectable, resource } from "@angular/core";
import { WeatherTransformer } from "../../models/weather.model";

@Injectable({ providedIn: 'root' })
export class WeatherService {
    private coordinates = { latitude: 36.9147, longitude: -111.4558 };

    setCoordinates(latitude: number, longitude: number) {
        this.coordinates = { latitude, longitude };
        this.data.reload();
    }

    data = resource({
        loader: async () => {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${this.coordinates.latitude}&longitude=${this.coordinates.longitude}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,weather_code&hourly=temperature_2m,weather_code,uv_index&models=best_match&current=uv_index,temperature_2m,weather_code&past_days=14&forecast_days=14&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch the Current Temp');
            }

            const data = await response.json();
            console.log(data);
            const modeledData = WeatherTransformer.transform(data);
            console.log(modeledData);
            return modeledData;
        }
    });
}