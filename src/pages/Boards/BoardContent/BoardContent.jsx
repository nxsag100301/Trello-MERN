import Box from '@mui/material/Box';
import ListColumns from './ListColumns/ListColumns';
import { mapOrder } from '~/utils/sort';
import {
    DndContext,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
    DragOverlay,
    defaultDropAnimationSideEffects,
    closestCorners
} from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import Column from './ListColumns/Column/Column';
import Card from './ListColumns/Column/ListCards/Card/Card';
import { cloneDeep } from 'lodash';

const ACTIVE_DRAG_ITEM_TYPE = {
    COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
    CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}


function BoardContent(props) {
    const { board } = props
    const [orderedColumns, setOrderedColumns] = useState([])
    const [activeDragItemId, setActiveDragItemId] = useState(null)
    const [activeDragItemType, setActiveDragItemType] = useState(null)
    const [activeDragItemData, setActiveDragItemData] = useState(null)
    const [oldColumn, setOldColumn] = useState([])

    // const pointerSensor = useSensor(PointerSensor, {
    //     activationConstraint: { distance: 10 }
    // })
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: { distance: 10 }
    })
    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            delay: 250,
            tolerance: 500
        }
    })
    const sensors = useSensors(mouseSensor, touchSensor)

    useEffect(() => {
        setOrderedColumns(mapOrder(board.columns, board.columnOrderIds, '_id'))
    }, [board])

    const findColumnByCardId = (cardId) => {
        return orderedColumns.find(item => item.cards.map(card => card._id)?.includes(cardId))
    }

    const moveCardBetweenDifferentColumn = (
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
    ) => {
        setOrderedColumns(prevColumn => {
            const overCardIndex = overColumn.cards?.findIndex(card => card._id === overCardId)
            let newCardIndex
            const isBelowOverItem = active.rect.current.translated &&
                active.rect.current.translated.top >
                over.rect.top + over.rect.height;

            const modifier = isBelowOverItem ? 1 : 0;

            newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn.cards?.length + 1;

            const nextColumn = cloneDeep(prevColumn)
            const nextActiveColumn = nextColumn.find(item => item._id === activeColumn._id)
            const nextOverColumn = nextColumn.find(item => item._id === overColumn._id)
            if (nextActiveColumn) {
                nextActiveColumn.cards = nextActiveColumn.cards.filter(item => item._id !== activeDraggingCardId)
                nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(item => item._id)
            }
            if (nextOverColumn) {
                nextOverColumn.cards = nextOverColumn.cards.filter(item => item._id !== activeDraggingCardId)
                const rebuildActiveDraggingCardData = {
                    ...activeDraggingCardData,
                    columnId: nextOverColumn._id
                }
                nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuildActiveDraggingCardData)
                nextOverColumn.cardOrderIds = nextOverColumn.cards.map(item => item._id)
            }

            return nextColumn
        })
    }

    const handleDragStart = (event) => {
        const { active } = event
        setActiveDragItemId(active.id)
        setActiveDragItemType(
            active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN
        )
        setActiveDragItemData(active?.data?.current)
        if (active?.data?.current?.columnId) {
            setOldColumn(findColumnByCardId(active.id))
        }
    }

    const handleDragOver = (event) => {
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
        const { active, over } = event
        if (!active || !over) return
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
            const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
            const { id: overCardId } = over
            const activeColumn = findColumnByCardId(activeDraggingCardId)
            const overColumn = findColumnByCardId(overCardId)
            if (!activeColumn || !overColumn) return
            if (activeColumn._id !== overColumn._id) {
                moveCardBetweenDifferentColumn(
                    overColumn,
                    overCardId,
                    active,
                    over,
                    activeColumn,
                    activeDraggingCardId,
                    activeDraggingCardData
                )
            }
        }
    }

    const handleDragEnd = (event) => {
        const { active, over } = event
        if (!over) return
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && active.id !== over.id) {
            const oldColumnIndex = orderedColumns.findIndex(item => item._id === active.id)
            const newColumnIndex = orderedColumns.findIndex(item => item._id === over.id)
            const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)
            // const dndOrderedColumnsIds = dndOrderedColumns.map(item => item._id)
            setOrderedColumns(dndOrderedColumns)
        }

        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
            const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
            const { id: overCardId } = over
            const activeColumn = findColumnByCardId(activeDraggingCardId)
            const overColumn = findColumnByCardId(overCardId)
            if (!activeColumn || !overColumn) return
            if (oldColumn._id !== overColumn._id) {
                moveCardBetweenDifferentColumn(
                    overColumn,
                    overCardId,
                    active,
                    over,
                    activeColumn,
                    activeDraggingCardId,
                    activeDraggingCardData
                )
            }
            else {
                const oldCardIndex = oldColumn.cards?.findIndex(item => item._id === activeDragItemId)
                const newCardIndex = overColumn.cards?.findIndex(item => item._id === overCardId)
                const dndOrderedCards = arrayMove(oldColumn.cards, oldCardIndex, newCardIndex)
                // const dndOrderedCards = dndOrderedCards.map(item => item._id)
                setOrderedColumns(prevColumn => {
                    const nextColumn = cloneDeep(prevColumn)
                    const activeColumn = nextColumn.find(item => item._id === overColumn._id)
                    activeColumn.cards = dndOrderedCards
                    activeColumn.cardOrderIds = dndOrderedCards.map(item => item._id)
                    return nextColumn
                })
            }

        }

        setActiveDragItemId(null)
        setActiveDragItemType(null)
        setActiveDragItemData(null)
        setOldColumn([])
    }

    const dropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: {
                active: {
                    opacity: '0.5'
                }
            }
        })
    }


    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <Box sx={{
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2d3436' : '#015fdd'),
                width: '100%',
                height: (theme) => theme.trello.boardContentHeight,
                p: '10px 0'
            }}>

                <ListColumns columns={orderedColumns} />
                <DragOverlay dropAnimation={dropAnimation}>
                    {!activeDragItemType && null}
                    {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && <Column column={activeDragItemData} />}
                    {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && <Card card={activeDragItemData} />}
                </DragOverlay>
            </Box>
        </DndContext>
    );
}

export default BoardContent;