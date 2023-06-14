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
import { Messages } from '../utils/messages';
import { TempScale } from '../utils/api';

const App: React.FC<{}> = () => {
    const [options, setOptions] = useState<LocalStorageOptions | null>(null);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [tempScale, setTempScale] = useState<TempScale>('metric');

    useEffect(() => {
        getStoredOptions().then((options) => {
            setOptions(options);
            setIsActive(options.isActive);
            setTempScale(options.tempScale);
        });
    }, []);

    useEffect(() => {
        chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
            if (msg === Messages.TOGGLE_OVERLAY) {
                setIsActive(!isActive);
            } else if (msg === Messages.TOGGLE_SCALE) {
                getStoredOptions().then((options) => {
                    setOptions(options);
                    setIsActive(options.isActive);
                    setTempScale(options.tempScale);
                });
            }
            sendResponse();
        });
    }, [isActive]);

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
                        tempScale={tempScale}
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
