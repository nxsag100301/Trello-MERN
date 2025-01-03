import Box from '@mui/material/Box';
import Column from './Column/Column';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import Button from '@mui/material/Button';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';

const ListColumns = (props) => {
    const { columns } = props

    const items = columns?.map(item => {
        return item._id
    })

    return (
        <SortableContext items={items} strategy={horizontalListSortingStrategy}>
            <Box sx={{
                bgcolor: 'inherit',
                width: '100%',
                height: '100%',
                display: 'flex',
                overflowX: 'auto',
                overflowY: 'hidden',
                '&::-webkit-scrollbar-track': { m: 1 }

            }}>

                {columns?.length > 0 && columns.map(item =>
                    <Column column={item} key={item._id} />
                )}

                <Box sx={{
                    minWidth: '200px',
                    maxWidth: '200px',
                    mx: 1,
                    borderRadius: '6px',
                    height: 'fit-content',
                    bgcolor: '#ffffff3d'
                }}>
                    <Button sx={{
                        color: 'white',
                        width: '100%',
                        py: 1,
                        justifyContent: 'flex-start',
                        pl: 2.5
                    }}
                        startIcon={<PlaylistAddIcon />}
                    >
                        Add new column
                    </Button>
                </Box>

            </Box>

        </SortableContext>
    );
};

export default ListColumns;