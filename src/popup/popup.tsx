import React from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/roboto';
import './popup.css';
import WeatherCard from './WeatherCard/WeatherCard';

const App: React.FC<{}> = () => {
    return (
        <div>
            <WeatherCard city='Toronto' />
            <WeatherCard city='Bratislava' />
        </div>
    );
};

const container = document.createElement('div');
container.id = 'root';
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);
