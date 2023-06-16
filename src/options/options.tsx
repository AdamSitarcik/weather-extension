import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/roboto';
import './options.css';
import {
    LocalStorageOptions,
    getStoredOptions,
    setStoredOptions,
} from '../utils/storage';
import {
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Switch,
} from '@mui/material';
import { updateBadge } from '../utils/api';

type FormState = 'ready' | 'saving';

const App: React.FC<{}> = () => {
    const [options, setOptions] = useState<LocalStorageOptions | null>(null);
    const [formState, setFormState] = useState<FormState>('ready');

    const handleHomeCityChange = (homeCity: string) => {
        setOptions({ ...options, homeCity });
    };

    const handleSaveOptions = () => {
        setFormState('saving');
        setStoredOptions(options).then(() => {
            setTimeout(() => {
                setFormState('ready');
            }, 500);
        });
        updateBadge(getStoredOptions);
    };

    const handleShowOverlayChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setOptions({ ...options, isActive: e.target.checked });
    };

    const isFieldDisabled = formState === 'saving';

    useEffect(() => {
        getStoredOptions().then((options) => {
            setOptions(options);
        });
    }, []);

    if (!options) return;

    return (
        <Card sx={{ width: '600px' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='h4' sx={{ pb: '50px' }}>
                    Weather extension options
                </Typography>
                <Typography variant='body1' sx={{ pb: '10px' }}>
                    Home city
                </Typography>
                <TextField
                    fullWidth
                    placeholder='Enter a home city'
                    value={options.homeCity}
                    onChange={(event) =>
                        handleHomeCityChange(event.target.value)
                    }
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            handleSaveOptions();
                        }
                    }}
                    disabled={isFieldDisabled}
                />
                <div className='switch-container'>
                    <Typography variant='body1'>Show overlay</Typography>
                    <Switch
                        checked={options.isActive}
                        onChange={handleShowOverlayChange}
                        disabled={isFieldDisabled}
                    />
                </div>
                <Button
                    color='primary'
                    variant='contained'
                    onClick={handleSaveOptions}
                    disabled={isFieldDisabled}
                    sx={{ mt: '24px', fontWeight: 'bold', width: '50px' }}
                >
                    {formState === 'ready' ? 'Save' : 'Saving'}
                </Button>
            </CardContent>
        </Card>
    );
};

const container = document.createElement('div');
container.id = 'root';
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);
