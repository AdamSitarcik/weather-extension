import React, { useEffect, useState } from 'react';
import {
    fetchOpenWeatherData,
    OpenWeatherData,
    TempScale,
} from '../../utils/api';
import {
    Box,
    Card,
    CardContent,
    Typography,
    CardActions,
    Button,
} from '@mui/material';
import './WeatherCard.css';

const WeatherCardContainer: React.FC<{
    children: React.ReactNode;
    onDelete?: () => void;
}> = ({ children, onDelete }) => {
    return (
        <Box my={'16px'}>
            <Card>
                <CardContent>{children}</CardContent>
                <CardActions>
                    {onDelete && (
                        <Typography className="weather-card-body1">
                            <Button color='error' onClick={onDelete}>
                                Delete
                            </Button>
                        </Typography>
                    )}
                </CardActions>
            </Card>
        </Box>
    );
};

type WeatherCardState = 'loading' | 'error' | 'ready';

const WeatherCard: React.FC<{
    city: string;
    onDelete?: () => void;
    tempScale?: TempScale;
}> = ({ city, onDelete, tempScale }) => {
    const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(
        null
    );
    const [cardState, setCardState] = useState<WeatherCardState>('loading');

    useEffect(() => {
        fetchOpenWeatherData(city, tempScale)
            .then((data) => {
                setWeatherData(data);
                setCardState('ready');
            })
            .catch((err) => {
                console.log(err);
                setCardState('error');
            });
    }, [city, tempScale]);

    if (cardState == 'loading' || cardState == 'error') {
        return (
            <WeatherCardContainer onDelete={onDelete}>
                <Typography className='weather-card-title'>{city}</Typography>
                <Typography className='weather-card-body1'>
                    {cardState == 'loading'
                        ? 'Loading...'
                        : `Error: could not retrieve data for ${city}`}
                </Typography>
            </WeatherCardContainer>
        );
    }

    return (
        <WeatherCardContainer onDelete={onDelete}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography className='weather-card-title'>
                    {weatherData.name}
                </Typography>
                <Typography className='weather-card-temp'>
                    {Math.round(weatherData.main.temp)}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                    <Typography className='weather-card-body1'>
                        Max: {Math.round(weatherData.main.temp_max)}
                    </Typography>
                    <Typography className='weather-card-body1'>
                        Min: {Math.round(weatherData.main.temp_min)}
                    </Typography>
                </Box>
                <Typography className='weather-card-body1'>
                    Feels like: {Math.round(weatherData.main.feels_like)}
                </Typography>
            </Box>
        </WeatherCardContainer>
    );
};

export default WeatherCard;
