import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import MachineGroup from './MachineGroup';

const ProductColumn = ({ product, machines, subProducts, selectedView, droppableId }) => {
  const productName = product ? product.name : 'Unassigned';
  const productId = product ? product.id : 'unassigned';
  
  // Group machines by sub-product
  const groupedMachines = {};
  
  if (product && product.subProducts && product.subProducts.length > 0) {
    // Initialize groups for each sub-product
    product.subProducts.forEach(sp => {
      groupedMachines[sp] = [];
    });
    
    // Add machines to their groups
    machines.forEach(m => {
      if (m.subProduct && groupedMachines[m.subProduct] !== undefined) {
        groupedMachines[m.subProduct].push(m);
      } else {
        // Machines without sub-product go to ungrouped
        if (!groupedMachines['_ungrouped']) {
          groupedMachines['_ungrouped'] = [];
        }
        groupedMachines['_ungrouped'].push(m);
      }
    });
    
    // Remove empty sub-product groups
    Object.keys(groupedMachines).forEach(key => {
      if (groupedMachines[key].length === 0 && key !== '_ungrouped') {
        delete groupedMachines[key];
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
          const displayName = groupName === '_ungrouped'
            ? 'Other'
            : groupName === '_all'
              ? null
              : groupName;
          const subProductValue = groupName === '_all' || groupName === '_ungrouped' ? null : groupName;
          let groupDroppableId;
          if (selectedView === 'environment') {
            groupDroppableId = JSON.stringify({ environment: productId });
          } else if (selectedView === 'owner') {
            groupDroppableId = JSON.stringify({ owner: productId });
          } else {
            groupDroppableId = productId !== 'unassigned' && productId !== undefined && productId !== null
              ? JSON.stringify({ productId, subProduct: subProductValue })
              : JSON.stringify({ productId: 'unassigned', subProduct: null });
          }
          return (
            <MachineGroup
              key={groupName}
              groupName={displayName}
              machines={groupMachines}
              productId={productId}
              subProduct={subProductValue}
              droppableId={groupDroppableId}
            />
          );
        })}
      </div>
      {/* Empty state */}
      {machines.length === 0 && (
        <Droppable droppableId={
          selectedView === 'environment'
            ? JSON.stringify({ environment: productId })
            : selectedView === 'owner'
              ? JSON.stringify({ owner: productId })
              : JSON.stringify({ productId: productId || 'unassigned', subProduct: null })
        }>
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
