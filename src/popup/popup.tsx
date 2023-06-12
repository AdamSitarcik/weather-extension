import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/roboto';
import './popup.css';
import WeatherCard from './WeatherCard/WeatherCard';
import { Box, InputBase, IconButton, Paper } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const App: React.FC<{}> = () => {
    const [cities, setCities] = useState<string[]>(['Toronto', 'Bratislava']);

    const [cityInput, setCityInput] = useState<string>('');

    const handleCityBtnClick = () => {
        if (cityInput === '') return;

        setCities([...cities, cityInput]);
        setCityInput('');
    };

    const handleCityDelete = (index: number) => {
        cities.splice(index, 1);
        setCities([...cities]);
    };

    return (
        <div>
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
                />
                <IconButton onClick={handleCityBtnClick}>
                    <AddIcon />
                </IconButton>
            </Paper>
            {cities.map((city, index) => (
                <WeatherCard
                    city={city}
                    key={index}
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
