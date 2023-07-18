import { useEffect } from 'react';
import { updateBadge } from '../utils/api';
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

    chrome.alarms.create({ periodInMinutes: 15 });
    updateBadge(getStoredOptions);
});

chrome.contextMenus.onClicked.addListener((data) => {
    getStoredCities().then((cities) => {
        console.log(cities);
        setStoredCities([...cities, data.selectionText]);
    });
});

chrome.alarms.onAlarm.addListener(() => {
    updateBadge(getStoredOptions);
});