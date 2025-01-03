import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar';
import BoardContent from './BoardContent/BoardContent';
import { mockData } from '~/apis/mock-data';

function Board(props) {
    const boadBarData = {
        title: mockData.board.title,
        type: mockData.board.type
    }
    return (
        <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
            <AppBar />
            <BoardBar boadBarData={boadBarData} />
            <BoardContent board={mockData.board} />
        </Container>
    );
}

export default Board;