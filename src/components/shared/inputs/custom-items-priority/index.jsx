import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

function CustomItemsPriorityDnd ({ children }) {
  const childs = React.Children.map(children, (child, index) => {
    return (
      <Draggable key={index} draggableId={index.toString()} index={index}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            {child}
          </div>
        )}
      </Draggable>
    )
  })

  return (
    <DragDropContext>
      <Droppable droppableId='droppable-items'>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {childs}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default CustomItemsPriorityDnd