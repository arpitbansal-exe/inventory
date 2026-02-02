import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import MachineCard from './MachineCard';

const MachineGroup = ({ groupName, machines, productId, subProduct, droppableId }) => {
  // droppableId is now passed in as a prop (JSON string)
  console.log('MachineGroup rendered:', { groupName, productId, subProduct, droppableId, machineCount: machines.length });
  return (
    <div>
      {/* Group Label */}
      {groupName && (
        <div className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-2">
          {groupName}
        </div>
      )}
      
      {/* Droppable Area */}
      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`
              min-h-[60px] rounded-lg p-2
              ${snapshot.isDraggingOver ? 'bg-blue-100 border-2 border-blue-300 border-dashed' : 'bg-transparent'}
            `}
          >
            {machines.map((machine, index) => (
              <Draggable key={machine.id} draggableId={machine.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <MachineCard machine={machine} isDragging={snapshot.isDragging} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default MachineGroup;
