import Box from '@mui/material/Box';

function BoardContent(props) {
    return (
        <Box sx={{
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2d3436' : '#1976d2'),
            width: '100%',
            height: (theme) => `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
        }}>
            Board content
        </Box>
    );
}

export default BoardContent;