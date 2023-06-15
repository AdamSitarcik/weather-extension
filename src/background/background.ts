import {
    getStoredCities,
    setStoredCities,
    setStoredOptions,
} from '../utils/storage';
import { Messages } from '../utils/messages';

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
});

chrome.contextMenus.onClicked.addListener((data) => {
    getStoredCities().then((cities) => {
        console.log(cities);
        setStoredCities([...cities, data.selectionText]);
    });
});
