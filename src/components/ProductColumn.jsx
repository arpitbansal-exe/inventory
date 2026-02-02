import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import MachineGroup from './MachineGroup';

const ProductColumn = ({ product, machines, subProducts }) => {
  const productName = product ? product.name : 'Unassigned';
  const productId = product ? product.id : 'unassigned';
  
  // Group machines by sub-product
  const groupedMachines = {};
  
  if (product && product.subProducts) {
    // Initialize groups for each sub-product
    product.subProducts.forEach(sp => {
      groupedMachines[sp] = [];
    });
    
    // Add machines to their groups
    machines.forEach(m => {
      if (m.subProduct && groupedMachines[m.subProduct]) {
        groupedMachines[m.subProduct].push(m);
      } else {
        // Machines without sub-product go to ungrouped
        if (!groupedMachines['_ungrouped']) {
          groupedMachines['_ungrouped'] = [];
        }
        groupedMachines['_ungrouped'].push(m);
      }
    });
  } else {
    // No sub-products, all machines in one group
    groupedMachines['_all'] = machines;
  }
  
  return (
    <div className="bg-gray-50 rounded-lg p-4 min-w-[280px] max-w-[320px] flex-shrink-0">
      {/* Column Header */}
      <div className="mb-4">
        <h3 className="font-semibold text-gray-900 text-lg mb-1">{productName}</h3>
        <p className="text-sm text-gray-500">{machines.length} machines</p>
      </div>
      
      {/* Machine Groups */}
      <div className="space-y-4">
        {Object.entries(groupedMachines).map(([groupName, groupMachines]) => {
          if (groupMachines.length === 0) return null;
          
          const displayName = groupName === '_ungrouped' 
            ? 'Other' 
            : groupName === '_all' 
            ? null 
            : groupName;
          
          return (
            <MachineGroup
              key={groupName}
              groupName={displayName}
              machines={groupMachines}
              productId={productId}
              subProduct={groupName !== '_all' && groupName !== '_ungrouped' ? groupName : null}
            />
          );
        })}
      </div>
      
      {/* Empty state */}
      {machines.length === 0 && (
        <Droppable droppableId={`${productId}-empty`}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`
                border-2 border-dashed rounded-lg p-8 text-center
                ${snapshot.isDraggingOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300'}
              `}
            >
              <p className="text-gray-400 text-sm">Drop machines here</p>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      )}
    </div>
  );
};

export default ProductColumn;
