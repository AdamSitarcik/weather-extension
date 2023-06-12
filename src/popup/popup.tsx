import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './popup.css';
import { fetchOpenWeatherData } from '../utils/api';

const App: React.FC<{}> = () => {
    useEffect(() => {
        fetchOpenWeatherData('Toronto', 'metric')
            .then((data) => {
                console.log(data);
                console.log('Temp is ', data.main.temp);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <img src='icon.png' alt='' />
        </div>
    );
};

const container = document.createElement('div');
container.id = 'root';
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);
