import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar';
import BoardContent from './BoardContent/BoardContent';
import { mockData } from '~/apis/mock-data';
import { useEffect, useState } from 'react';
import { fetchBoardDetailsAPI } from '~/apis';

function Board() {
    const [board,setBoard] = useState(null)
    useEffect(()=> {
        const boardId = '6779f8efc060b7df5c0bf7f3'
        fetchBoardDetailsAPI(boardId).then(board => {
            console.log(board)
            setBoard(board)
        })
    },[])

    const boadBarData = {
        title: mockData.board.title,
        type: mockData.board.type
    }
    
    return (
        <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
            <AppBar />
            <BoardBar boadBarData={board} />
            <BoardContent board={board} />
        </Container>
    );
}

export default Board;