import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useColorScheme } from '@mui/material';
import Box from '@mui/material/Box';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';

const SelectDarkLight = () => {
    const { mode, setMode } = useColorScheme();

    const handleChange = (event) => {
        setMode(event.target.value);
    };

    return (
        <FormControl size="small" sx={{ minWidth: '120px' }}>
            <InputLabel
                id="label-select-dark-light"
                sx={{
                    color: 'white',
                    '&.Mui-focused': { color: 'white' }
                }}
            >
                Mode
            </InputLabel>
            <Select
                labelId="label-select-dark-light"
                id="demo-select-small"
                value={mode}
                label="Mode"
                onChange={handleChange}
                sx={{
                    color: 'white',
                    '.MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                    '.MuiSvgIcon-root': { color: 'white' }
                }}
            >
                <MenuItem value={'light'}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <LightModeIcon fontSize='small' /> Light
                    </Box>
                </MenuItem>
                <MenuItem value={'dark'}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <DarkModeIcon fontSize='small' />Dark
                    </Box>
                </MenuItem>
                <MenuItem value={'system'}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <SettingsSuggestIcon fontSize='small' /> System
                    </Box>
                </MenuItem>
            </Select>
        </FormControl>
    );
}

export default SelectDarkLight
