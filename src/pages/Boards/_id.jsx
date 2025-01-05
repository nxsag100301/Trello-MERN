import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar';
import BoardContent from './BoardContent/BoardContent';
import { useEffect, useState } from 'react';
import { fetchBoardDetailsAPI } from '~/apis';

function Board() {
    const [board,setBoard] = useState(null)
    useEffect(()=> {
        const boardId = '677a3205bdf6fa77993473b2'
        fetchBoardDetailsAPI(boardId).then(board => {
            setBoard(board)
        })
    },[])

    const boardBarData = {
        title: board?.title,
        type: board?.type,
        description: board?.description,
    }
    
    return (
        <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
            <AppBar />
            <BoardBar boadBarData={boardBarData} />
            <BoardContent board={board} />
        </Container>
    );
}

export default Board;