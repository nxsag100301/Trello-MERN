import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentCut from '@mui/icons-material/ContentCut';
import Cloud from '@mui/icons-material/Cloud';
import Menu from '@mui/material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Tooltip from '@mui/material/Tooltip';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import AddCardIcon from '@mui/icons-material/AddCard';
import Button from '@mui/material/Button';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import ListCards from './ListCards/ListCards';
import { mapOrder } from '~/utils/sort';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


const Column = (props) => {
    const { column } = props
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: column._id,
        data: { ...column }
    });

    const dndKitColumnStyle = {
        // touchAction: 'none',
        transform: CSS.Translate.toString(transform),
        transition,
        height: '100%',
        opacity: isDragging ? 0.5 : 1
    };

    const orderedCard = mapOrder(column.cards, column.cardOrderIds, '_id')

    return (
        <div
            ref={setNodeRef}
            style={dndKitColumnStyle}
            {...attributes}
        >
            <Box
                {...listeners}
                sx={{
                    minWidth: '300px',
                    maxWidth: '300px',
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#636e72' : '#dfe6e9'),
                    m: '0 8px',
                    borderRadius: '6px',
                    height: 'fit-content',
                    maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
                }}
            >

                <Box
                    sx={{
                        height: (theme) => theme.trello.columnHeaderHeight,
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <Typography sx={{ fontWeight: 500, cursor: 'pointer', fontSize: '1rem !important' }}>
                        {column.title}
                    </Typography>
                    <Box>
                        <Tooltip title='More options'>
                            <ExpandMoreIcon
                                sx={{
                                    color: 'text.primary', cursor: 'pointer'
                                }}
                                id="basic-column-dropdown"
                                aria-controls={open ? 'basic-menu-column' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            />
                        </Tooltip>
                        <Menu
                            id="basic-menu-column"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-column-dropdown',
                            }}
                        >
                            <MenuItem>
                                <ListItemIcon><AddCardIcon fontSize="small" /></ListItemIcon>
                                <ListItemText>Add new card</ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon><ContentCopyIcon fontSize="small" /></ListItemIcon>
                                <ListItemText>Copy</ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                                <ListItemText>Cut</ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon><ContentPasteIcon fontSize="small" /></ListItemIcon>
                                <ListItemText>Patse</ListItemText>
                            </MenuItem>
                            <Divider />
                            <MenuItem>
                                <ListItemIcon><DeleteForeverIcon fontSize="small" /></ListItemIcon>
                                <ListItemText>Remove this column</ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
                                <ListItemText>Archive this column</ListItemText>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Box>

                <ListCards cards={orderedCard} />

                <Box
                    sx={{
                        height: (theme) => theme.trello.columnFooterHeight,
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <Button sx={{
                        color: (theme) => (theme.palette.mode === 'dark' ? 'white' : '#1976d2')
                    }}
                        startIcon={<AddCardIcon />}
                    >
                        Add new card
                    </Button>
                    <Tooltip title='Drag to move'>
                        <DragHandleIcon sx={{ cursor: 'pointer' }} />
                    </Tooltip>
                </Box>

            </Box>
        </div>
    );
};

export default Column;