import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import WeatherCard from '../components/WeatherCard/WeatherCard';
import { Card } from '@mui/material';
import './contentScript.css';
import {
    LocalStorageOptions,
    getStoredOptions,
    setStoredOptions,
} from '../utils/storage';

const App: React.FC<{}> = () => {
    const [options, setOptions] = useState<LocalStorageOptions | null>(null);
    const [isActive, setIsActive] = useState<boolean>(false);

    useEffect(() => {
        getStoredOptions().then((options) => {
            setOptions(options);
            setIsActive(options.isActive);
        });
    }, []);

    if (!options) return;

    const toggleIsActive = () => {
        setStoredOptions({ ...options, isActive: !options.isActive }).then(
            () => {
                setIsActive(!isActive);
            }
        );
    };

    return (
        <>
            {isActive && (
                <Card className='overlay-card'>
                    <WeatherCard
                        city={options.homeCity}
                        tempScale={options.tempScale}
                        onDelete={toggleIsActive}
                    />
                </Card>
            )}
        </>
    );
};

const container = document.createElement('div');
container.id = 'root';
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);
