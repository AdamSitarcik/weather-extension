import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/roboto';
import './popup.css';
import WeatherCard from './WeatherCard/WeatherCard';
import { Box, InputBase, IconButton, Paper, Icon } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import {
    setStoredCities,
    getStoredCities,
    setStoredOptions,
    getStoredOptions,
    LocalStorageOptions,
} from '../utils/storage';

const App: React.FC<{}> = () => {
    const [cities, setCities] = useState<string[]>([]);

    const [cityInput, setCityInput] = useState<string>('');

    const [options, setOptions] = useState<LocalStorageOptions | null>(null);

    useEffect(() => {
        getStoredCities().then((cities) => setCities(cities));
        getStoredOptions().then((options) => setOptions(options));
    }, []);

    const handleCityBtnClick = () => {
        if (cityInput === '') return;
        const updatedCities = [...cities, cityInput];

        setStoredCities(updatedCities).then(() => {
            setCities([...cities, cityInput]);
            setCityInput('');
        });
    };

    const handleCityDelete = (index: number) => {
        cities.splice(index, 1);

        setStoredCities(cities).then(() => {
            setCities([...cities]);
        });
    };

    const toggleTempScale = () => {
        const optionToggle: LocalStorageOptions = {
            ...options,
            tempScale: options.tempScale === 'metric' ? 'imperial' : 'metric',
        };
        setStoredOptions(optionToggle).then(() => {
            setOptions(optionToggle);
        });
    };

    if (!options) {
        return null;
    }

    return (
        <div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Paper
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        padding: '4px 2px 4px 16px',
                        boxSizing: 'border-box',
                    }}
                >
                    <InputBase
                        placeholder='Add a city'
                        value={cityInput}
                        onChange={(event) => {
                            setCityInput(event.target.value);
                        }}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                handleCityBtnClick();
                            }
                        }}
                    />
                    <IconButton onClick={handleCityBtnClick}>
                        <AddIcon />
                    </IconButton>
                </Paper>
                <IconButton
                    onClick={toggleTempScale}
                    sx={{ width: '40px', height: '40px' }}
                >
                    {options.tempScale === 'metric' ? '\u2103' : '\u2109'}
                </IconButton>
            </div>
            {cities.map((city, index) => (
                <WeatherCard
                    city={city}
                    key={index}
                    tempScale={options.tempScale}
                    onDelete={() => {
                        handleCityDelete(index);
                    }}
                />
            ))}
            <Box height={'8px'}></Box>
        </div>
    );
};

const container = document.createElement('div');
container.id = 'root';
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);
