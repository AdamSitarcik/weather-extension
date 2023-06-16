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
    tempScale: TempScale
): Promise<OpenWeatherData> => {
    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_API_KEY}&units=${tempScale}`
    );

    if (!res.ok) {
        throw new Error('City not found');
    }

    const data: OpenWeatherData = await res.json();

    return data;
};

export type TempScale = 'metric' | 'imperial';

export const getWeatherIconSrc = (iconCode:string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
}

export const updateBadge = (getStoredOptions) => {
    getStoredOptions().then((options) => {
        if (options.homeCity === '') return;

        fetchOpenWeatherData(options.homeCity, options.tempScale).then(
            (data) => {
                chrome.action.setBadgeText({
                    text:
                        String(Math.floor(data.main.temp)) +
                        (options.tempScale === 'metric' ? '\u2103' : '\u2109'),
                });
            }
        );
    });
};