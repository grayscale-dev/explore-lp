import { Injectable, resource } from "@angular/core";
import { WaterDataTransformer } from "src/app/models/water-data.model";

@Injectable({
    providedIn: 'root'
})

export class WaterDataService {
    data = resource({
        loader: async () => {
            const url = "https://stgexplorelp.blob.core.windows.net/daily-cache/usbr-water-data.json"
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error('Failed to fetch the Water Data')
            }

            const rawData = await response.json()
            // console.log(rawData)
            return WaterDataTransformer.transform(rawData);
        }
    })
}