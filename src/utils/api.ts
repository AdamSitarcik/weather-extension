const OPEN_WEATHER_API_KEY: string = '6151383649a9505cb6f4e58e8f60fa01';

export interface OpenWeatherData {
    name: string;
    main: {
        feels_like: number;
        humidity: number;
        pressure: number;
        temp: number;
        temp_max: number;
        temp_min: number;
    };
    weather: {
        description: string;
        icon: string;
        id: number;
        main: string;
    }[];
    wind: {
        speed: number;
        deg: number;
    };
}

export const fetchOpenWeatherData = async (
    city: string,
    units: string
): Promise<OpenWeatherData> => {
    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_API_KEY}&units=${units}`
    );

    if (!res.ok) {
        throw new Error('City not found');
    }

    const data: OpenWeatherData = await res.json();

    return data;
};
