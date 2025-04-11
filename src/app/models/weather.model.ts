import { getWeatherIcon, WeatherIconInfo } from "../utils/weather-icons";

export interface WeatherApiResponse {
    current: {
        temperature_2m: number;
        uv_index: number;
        weather_code: number;
    };
    hourly: {
        temperature_2m: number[];
        time: string[];
        uv_index: number[];
        weather_code: number[];
    };
    daily: {
        precipitation_sum: number[];
        sunrise: string[];
        sunset: string[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
        time: string[];
        uv_index_max: number[];
        weather_code: number[];
    };
}

export interface CurrentWeather {
    currentTemp: number;
    tempHigh: number;
    tempLow: number;
    uvIndex: number;
    sunrise: string;
    sunset: string;
    weatherCode: number;
    hourlyForecast: HourlyForecast[];
    dailyForecast: DailyForecast[];
}

interface HourlyForecast {
    time: Date;
    formattedTime: string;
    temperature: number;
    weatherIcon: WeatherIconInfo;
}

interface DailyForecast {
    date: Date;
    formattedDate: string;
    maxTemp: number;
    minTemp: number;
    sunrise: string;
    sunset: string;
    maxUvIndex: number;
    precipitationSum: number;
    weatherIcon: WeatherIconInfo;
}

export class WeatherTransformer {
    static transform(apiResponse: WeatherApiResponse): CurrentWeather {
        return {
            currentTemp: Math.round(apiResponse.current.temperature_2m),
            weatherCode: apiResponse.current.weather_code,
            uvIndex: apiResponse.current.uv_index,
            tempHigh: Math.round(apiResponse.daily.temperature_2m_max[14]),
            tempLow: Math.round(apiResponse.daily.temperature_2m_min[14]),
            sunrise: new Date(apiResponse.daily.sunrise[14] + 'Z').toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
            sunset: new Date(apiResponse.daily.sunset[14] + 'Z').toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
            hourlyForecast: this.transformHourlyData(apiResponse),
            dailyForecast: this.transformDailyData(apiResponse)
        };
    }

    private static transformHourlyData(apiResponse: WeatherApiResponse): HourlyForecast[] {
        const data = apiResponse.hourly.time.map((time, index) => ({
            time: new Date(time + 'Z'),
            formattedTime: new Date(time + 'Z').toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
            temperature: Math.round(apiResponse.hourly.temperature_2m[index]),
            weatherIcon: getWeatherIcon(apiResponse.hourly.weather_code[index])
        }))
        .filter(forecast => {
            const hourDiff = (forecast.time.getTime() - new Date().getTime()) / 3600000;
            return hourDiff >= -1 && hourDiff < 23;
        })

        data[0].formattedTime = 'Now';

        return data;
    }

    private static transformDailyData(apiResponse: WeatherApiResponse): DailyForecast[] {
        const data = apiResponse.daily.time.map((time, index) => ({
            date: new Date(time),
            formattedDate: new Date(time).toLocaleDateString('en-US', { weekday: 'short' }),
            maxTemp: Math.round(apiResponse.daily.temperature_2m_max[index]),
            minTemp: Math.round(apiResponse.daily.temperature_2m_min[index]),
            sunrise: new Date(apiResponse.daily.sunrise[index] + "Z").toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
            sunset: new Date(apiResponse.daily.sunset[index] + "Z").toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
            maxUvIndex: apiResponse.daily.uv_index_max[index],
            precipitationSum: apiResponse.daily.precipitation_sum[index],
            weatherIcon: getWeatherIcon(apiResponse.hourly.weather_code[index])
        })).filter((forecast, index) => index >= 15 && index <= 21);

        data[0].formattedDate = 'Today';

        return data;
    }
}
