export interface WeatherIconInfo {
    icon: string;
    color: string;
}

export const getWeatherIcon = (weatherCode: number): WeatherIconInfo => {
    switch (weatherCode) {
        case 0:
            return {
                icon: 'sunny',
                color: 'text-yellow-400'
            };
        case 1:
        case 2:
        case 3:
            return {
                icon: 'partly-sunny', 
                color: 'text-gray-200'
            };
        case 45:
        case 48:
            return {
                icon: 'cloud',
                color: 'text-gray-400'
            };
        case 51:
        case 53:
        case 55:
        case 61:
        case 63:
        case 65:
        case 80:
        case 81: 
        case 82:
            return {
                icon: 'rainy',
                color: 'text-blue-400'
            };
        case 71:
        case 73:
        case 75:
        case 77:
        case 85:
        case 86:
            return {
                icon: 'snow',
                color: 'text-blue-200'
            };
        case 95:
        case 96:
        case 99:
            return {
                icon: 'thunderstorm',
                color: 'text-purple-400'
            };
        default:
            return {
                icon: 'cloud',
                color: 'text-gray-400'
            };
    }
};