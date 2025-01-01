import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import BoltIcon from '@mui/icons-material/Bolt';
import FilterListIcon from '@mui/icons-material/FilterList';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';


const CHIP_STYLES = {
    color: 'white',
    bgcolor: 'transparent',
    border: 'none',
    paddingX: '5px',
    borderRadius: '6px',
    '.MuiSvgIcon-root': {
        color: 'white'
    },
    '&:hover': {
        bgcolor: 'primary.50'
    }
}

function BoardBar(props) {
    return (
        <Box sx={{
            width: '100%',
            height: (theme) => theme.trello.boardBarHeight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            paddingX: 2,
            overflowX: 'auto',
            borderBottom: '1px solid white',
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2d3436' : '#1976d2')
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Chip sx={CHIP_STYLES}
                    icon={<DashboardIcon />}
                    label="Nguyen Xuan Sang"
                    clickable
                />
                <Chip sx={CHIP_STYLES}
                    icon={<VpnLockIcon />}
                    label="Public/Private Workspace"
                    clickable
                />
                <Chip sx={CHIP_STYLES}
                    icon={<AddToDriveIcon />}
                    label="Add To Google Drive"
                    clickable
                />
                <Chip sx={CHIP_STYLES}
                    icon={<BoltIcon />}
                    label="Automation"
                    clickable
                />
                <Chip sx={CHIP_STYLES}
                    icon={<FilterListIcon />}
                    label="Filters"
                    clickable
                />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button
                    variant="outlined"
                    startIcon={<PersonAddIcon />}
                    sx={{
                        color: 'white',
                        borderColor: 'white',
                        '&:hover': { borderColor: 'white' }
                    }}
                >
                    Invite
                </Button>
                <Box>
                    <AvatarGroup
                        max={4}
                        total={11}
                        sx={{
                            '& .MuiAvatar-root': {
                                width: 30,
                                height: 30,
                                fontSize: 16,
                                border: 'none'
                            }
                        }}
                    >
                        <Tooltip title="Remy Sharp">
                            <Avatar alt="Remy Sharp" src="https://v5.mui.com/static/images/avatar/3.jpg" />
                        </Tooltip>
                        <Tooltip title="Travis Howard">
                            <Avatar alt="Travis Howard" src="https://v5.mui.com/static/images/avatar/2.jpg" />
                        </Tooltip>
                        <Tooltip title="Cindy Baker">
                            <Avatar alt="Cindy Baker" src="https://v5.mui.com/static/images/avatar/1.jpg" />
                        </Tooltip>
                    </AvatarGroup>
                </Box>
            </Box>
        </Box>
    );
}

export default BoardBar;