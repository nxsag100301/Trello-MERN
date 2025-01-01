import SelectDarkLight from '~/components/SelectDarkLight'
import Box from '@mui/material/Box'
import AppsIcon from '@mui/icons-material/Apps'
import TrelloIcon from '~/assets/svg/trello.svg'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Workspaces from './Menus/Workspaces';
import Recent from './Menus/Recent';
import Starred from './Menus/Starred';
import Templates from './Menus/Templates';
import TextField from '@mui/material/TextField';
import Badge from '@mui/material/Badge';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Tooltip from '@mui/material/Tooltip';
import Profile from './Menus/Profile';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

function AppBar(props) {
    const [searchValue, setSearchValue] = useState('')
    return (
        <Box sx={{
            width: '100%',
            height: (theme) => theme.trello.appBarHeight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            paddingX: 2,
            overflowX: 'auto',
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#1c2223' : '#054dc2')
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AppsIcon sx={{ color: 'white' }} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <img src={TrelloIcon} style={{ width: '21px', height: '21px' }} />
                    <Typography sx={{
                        fontSize: '1.2rem',
                        fontWeight: '500',
                        color: 'white'
                    }}>
                        Trello
                    </Typography>

                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, marginLeft: 2 }}>
                        <Workspaces />
                        <Recent />
                        <Starred />
                        <Templates />
                        <Button
                            sx={{
                                color: 'white',
                            }}
                            startIcon={<AddToPhotosIcon />}
                        >
                            Create
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TextField
                    id="outlined-search"
                    label="Search..."
                    type="text"
                    size='small'
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
                    sx={{
                        minWidth: '120px',
                        maxWidth: '170px',
                        '& label': { color: 'white' },
                        '& input': { color: 'white' },
                        '& label.Mui-focused': { color: 'white' },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'white' },
                            '&:hover fieldset': { borderColor: 'white' },
                            '&.Mui-focused fieldset': { borderColor: 'white' }
                        }
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: 'white' }} />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <CloseIcon
                                onClick={() => setSearchValue('')}
                                sx={{
                                    fontSize: '15px',
                                    color: searchValue ? 'white' : 'transparent',
                                    cursor: searchValue ? 'pointer' : ''
                                }}
                            />
                        )
                    }}
                />

                <SelectDarkLight />

                <Tooltip title='Notifications'>
                    <Badge color="warning" variant="dot" sx={{ cursor: 'pointer' }}>
                        <NotificationsNoneIcon sx={{ color: 'white' }} />
                    </Badge>
                </Tooltip>

                <Tooltip title='Help'>
                    <HelpOutlineIcon sx={{ cursor: 'pointer', color: 'white' }} />
                </Tooltip>

                <Profile />
            </Box>
        </Box >
    );
}

export default AppBar;