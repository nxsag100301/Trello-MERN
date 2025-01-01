import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

function Profile() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 30, height: 30 }} alt="Nxsag" src="https://scontent.fdad1-4.fna.fbcdn.net/v/t39.30808-6/272703772_1384193348708552_1757747107133629519_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=pgzWKhRLk1oQ7kNvgGAw-I8&_nc_oc=Adjo1jsynPk-lO1nUTMJI7LOjdA83A-BN7jdVMLJeh0v-6liiNnAgCXAmqX6Rod2OvI&_nc_zt=23&_nc_ht=scontent.fdad1-4.fna&_nc_gid=AYNa5FOHcYwc61isc5pLmh9&oh=00_AYBOVk03IMY3lRcOf_A8p5HbGXD-w69xDUgxn4rq-aGmtA&oe=677A87A3" />
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose}>
                    <Avatar sx={{ width: 30, height: 30 }} alt="Remy Sharp" src="https://scontent.fdad1-4.fna.fbcdn.net/v/t39.30808-6/272703772_1384193348708552_1757747107133629519_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=pgzWKhRLk1oQ7kNvgGAw-I8&_nc_oc=Adjo1jsynPk-lO1nUTMJI7LOjdA83A-BN7jdVMLJeh0v-6liiNnAgCXAmqX6Rod2OvI&_nc_zt=23&_nc_ht=scontent.fdad1-4.fna&_nc_gid=AYNa5FOHcYwc61isc5pLmh9&oh=00_AYBOVk03IMY3lRcOf_A8p5HbGXD-w69xDUgxn4rq-aGmtA&oe=677A87A3" />
                    Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Avatar sx={{ width: 30, height: 30 }} alt="Remy Sharp" src="https://scontent.fdad1-4.fna.fbcdn.net/v/t39.30808-6/272703772_1384193348708552_1757747107133629519_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=pgzWKhRLk1oQ7kNvgGAw-I8&_nc_oc=Adjo1jsynPk-lO1nUTMJI7LOjdA83A-BN7jdVMLJeh0v-6liiNnAgCXAmqX6Rod2OvI&_nc_zt=23&_nc_ht=scontent.fdad1-4.fna&_nc_gid=AYNa5FOHcYwc61isc5pLmh9&oh=00_AYBOVk03IMY3lRcOf_A8p5HbGXD-w69xDUgxn4rq-aGmtA&oe=677A87A3" />
                    My account
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Add another account
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}

export default Profile