import { Injectable, resource } from "@angular/core";
import { WaterDataTransformer } from "src/app/models/water-data.model";

@Injectable({
    providedIn: 'root'
})

export class WaterDataService {
    currentDate = new Date()
    sixteenDaysAgo = new Date(this.currentDate).setDate(this.currentDate.getDate() - 16)
    formattedDate = new Date(this.sixteenDaysAgo).toISOString().split('T')[0]

    data = resource({
        loader: async () => {
            const url = `https://data.usbr.gov/rise/api/result?page=1&itemsPerPage=1000&locationId=393&parameterId=2,18,12,3&dateTime%5Bafter%5D=${this.formattedDate}`
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