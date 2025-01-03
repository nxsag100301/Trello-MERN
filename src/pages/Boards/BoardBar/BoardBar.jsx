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
import { capitalizeFirstLetter } from '~/utils/formatter';


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
    const { boadBarData } = props
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
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2d3436' : '#015fdd')
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Chip sx={CHIP_STYLES}
                    icon={<DashboardIcon />}
                    label={boadBarData.title}
                    clickable
                />
                <Chip sx={CHIP_STYLES}
                    icon={<VpnLockIcon />}
                    label={capitalizeFirstLetter(boadBarData.type)}
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
                        total={12}
                        sx={{
                            '& .MuiAvatar-root': {
                                width: 30,
                                height: 30,
                                fontSize: 16,
                                border: 'none',
                                color: 'white',
                                cursor: 'pointer',
                                '&:first-of-type': {
                                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#636e72' : '#6c5ce7')
                                }
                            }
                        }}
                    >
                        <Tooltip title="Travis Howard">
                            <Avatar alt="Travis Howard" src="https://v5.mui.com/static/images/avatar/2.jpg" />
                        </Tooltip>
                        <Tooltip title="Cindy Baker">
                            <Avatar alt="Cindy Baker" src="https://v5.mui.com/static/images/avatar/1.jpg" />
                        </Tooltip>
                        <Tooltip title="Remy Sharp">
                            <Avatar alt="Remy Sharp" src="https://v5.mui.com/static/images/avatar/3.jpg" />
                        </Tooltip>
                    </AvatarGroup>
                </Box>
            </Box>
        </Box>
    );
}

export default BoardBar;