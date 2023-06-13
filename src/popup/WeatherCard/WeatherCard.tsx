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
                        <Button color='error' onClick={onDelete}>
                            Delete
                        </Button>
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
                <Typography variant='body1'>
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
                <Typography variant='h5'>{weatherData.name}</Typography>
                <Typography variant='h4'>
                    {Math.round(weatherData.main.temp)}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                    <Typography variant='body1'>
                        Max: {Math.round(weatherData.main.temp_max)}
                    </Typography>
                    <Typography variant='body1'>
                        Min: {Math.round(weatherData.main.temp_min)}
                    </Typography>
                </Box>
                <Typography variant='body1'>
                    Feels like: {Math.round(weatherData.main.feels_like)}
                </Typography>
            </Box>
        </WeatherCardContainer>
    );
};

export default WeatherCard;
