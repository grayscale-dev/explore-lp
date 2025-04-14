export interface WaterDataApiResponse {
    data: [{
        attributes: {
            parameterId: number,
            result: number
        }
    }]
}

export interface WaterData {
    date: string;
    formattedDate: string;
    elevation: number;
    content: number;
    inflow: number;
    outflow: number;
    change?: number;
}

export class WaterDataTransformer {
    static transform(apiResponse: WaterDataApiResponse): WaterData[] {
        const groups: { [date: string]: { [paramId: number]: number } } = {};
        apiResponse.data.forEach((item: any) => {
            let date = new Date(item.attributes.createDate)
                .toLocaleDateString('en-US', {
                    timeZone: 'America/Denver',
                    weekday: 'short',
                    month: 'short',
                    day: '2-digit'
                })
            
            if (!groups[date]) {
                groups[date] = {}
            }

            const parameterId = item.attributes.parameterId
            groups[date][parameterId] = item.attributes.result
        })

        let dailyData = Object.keys(groups).map(dateStr => {
            const dayData = groups[dateStr]
            return {
                date: dateStr,
                formattedDate: new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short' }),
                elevation: dayData[2],  // Elevation (values around 3559.x).
                content: dayData[3],  // Content (values in the millions).
                inflow: Math.round(dayData[12]),  // Inflow (cfs).
                outflow: Math.round(dayData[18]),  // Outflow (cfs).
                change: 0
            }
        })

        dailyData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

        for (let i = 0; i < dailyData.length - 1; i++) {
            if (dailyData[i].elevation != null && dailyData[i + 1].elevation != null) {
                dailyData[i].change = parseFloat((dailyData[i].elevation - dailyData[i + 1].elevation).toFixed(2))
            } else {
                dailyData[i].change = 0
            }
        }

        dailyData.pop()
        console.log(dailyData)
        return dailyData
    }
}