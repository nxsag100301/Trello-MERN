import Box from '@mui/material/Box';
import Card from './Card/Card';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';



const ListCards = (props) => {
    const { cards } = props

    const items = cards?.map(item => {
        return item._id
    })
    return (
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <Box>
                <Box
                    sx={{
                        p: '0 5px',
                        m: '0 5px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        overflowX: 'hidden',
                        overflowY: 'auto',
                        maxHeight: (theme) => (
                            `calc(
                            ${theme.trello.boardContentHeight} - 
                            ${theme.spacing(5)} - 
                            ${theme.trello.columnHeaderHeight} - 
                            ${theme.trello.columnFooterHeight}
                            )`
                        ),
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#95a5a6' : '#b2bec3')
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                            backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#b2bec3' : '#95a5a6')
                        }
                    }}
                >
                    {cards?.length > 0 && cards.map(item =>
                        <Card key={item._id} card={item} />
                    )}


                </Box>
            </Box>
        </SortableContext>
    );
};

export default ListCards;