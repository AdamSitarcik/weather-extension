import { fetchOpenWeatherData } from '../utils/api';
import {
    getStoredCities,
    getStoredOptions,
    setStoredCities,
    setStoredOptions,
} from '../utils/storage';

chrome.runtime.onInstalled.addListener(() => {
    setStoredCities([]);
    setStoredOptions({
        homeCity: '',
        tempScale: 'metric',
        isActive: false,
    });

    chrome.contextMenus.create({
        id: 'contextMenu',
        title: 'Add to weather extension',
        contexts: ['selection'],
    });

    chrome.alarms.create({ periodInMinutes: 60 });
});

chrome.contextMenus.onClicked.addListener((data) => {
    getStoredCities().then((cities) => {
        console.log(cities);
        setStoredCities([...cities, data.selectionText]);
    });
});

chrome.alarms.onAlarm.addListener(() => {
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
});
