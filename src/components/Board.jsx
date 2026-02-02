import React from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import useStore from '../store/store';
import ProductColumn from './ProductColumn';

const Board = () => {
  const products = useStore((state) => state.products);
  const machines = useStore((state) => state.machines);
  const getFilteredMachines = useStore((state) => state.getFilteredMachines);
  const moveMachine = useStore((state) => state.moveMachine);
  const updateMachine = useStore((state) => state.updateMachine);
  const selectedView = useStore((state) => state.selectedView);
  
  const filteredMachines = getFilteredMachines();
  
  // Handle drag and drop
  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    
    console.log('Drag ended:', { source, destination, draggableId });
    
    // Dropped outside any droppable
    if (!destination) {
      console.log('Dropped outside droppable area');
      return;
    }

    // Dropped in same place
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      console.log('Dropped in same place');
      return;
    }

    // Parse destination droppableId as JSON for all views
    try {
      const parsed = JSON.parse(destination.droppableId);
      if (selectedView === 'product') {
        const newProductId = parsed.productId === 'unassigned' ? null : parsed.productId;
        const newSubProduct = parsed.subProduct === undefined || parsed.subProduct === null || parsed.subProduct === '_all' || parsed.subProduct === '_ungrouped' ? null : parsed.subProduct;
        console.log('Moving machine', draggableId, 'to product:', newProductId, 'subProduct:', newSubProduct);
        moveMachine(draggableId, newProductId, newSubProduct);
      } else if (selectedView === 'environment') {
        const newEnvironment = parsed.environment === undefined || parsed.environment === null ? null : parsed.environment;
        console.log('Moving machine', draggableId, 'to environment:', newEnvironment);
        updateMachine(draggableId, { environment: newEnvironment });
      } else if (selectedView === 'owner') {
        const newOwner = parsed.owner === undefined || parsed.owner === null || parsed.owner === 'no-owner' ? null : parsed.owner;
        console.log('Moving machine', draggableId, 'to owner:', newOwner);
        updateMachine(draggableId, { owner: newOwner });
      }
    } catch (e) {
      console.error('Failed to parse droppableId as JSON:', destination.droppableId, e);
    }
  };
  
  // Group machines based on selected view
  const groupMachinesByView = () => {
    if (selectedView === 'product') {
      // Group by product
      const grouped = {};
      
      // Add all products
      products.forEach(p => {
        grouped[p.id] = {
          product: p,
          machines: filteredMachines.filter(m => m.productId === p.id)
        };
      });
      
      // Add unassigned
      grouped['unassigned'] = {
        product: null,
        machines: filteredMachines.filter(m => !m.productId)
      };
      
      return grouped;
    } else if (selectedView === 'environment') {
      // Group by environment
      const environments = ['prod', 'staging', 'dev', 'test'];
      const grouped = {};
      
      environments.forEach(env => {
        grouped[env] = {
          product: { id: env, name: env.charAt(0).toUpperCase() + env.slice(1), subProducts: null },
          machines: filteredMachines.filter(m => m.environment === env)
        };
      });
      
      return grouped;
    } else if (selectedView === 'owner') {
      // Group by owner
      const owners = [...new Set(filteredMachines.map(m => m.owner).filter(Boolean))].sort();
      const grouped = {};
      
      owners.forEach(owner => {
        grouped[owner] = {
          product: { id: owner, name: owner, subProducts: null },
          machines: filteredMachines.filter(m => m.owner === owner)
        };
      });
      
      // Add unassigned
      grouped['no-owner'] = {
        product: { id: 'no-owner', name: 'No Owner', subProducts: null },
        machines: filteredMachines.filter(m => !m.owner)
      };
      
      return grouped;
    }
    
    return {};
  };
  
  const groupedMachines = groupMachinesByView();
  
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex-1 overflow-auto">
        <div className="flex gap-4 p-6 min-h-full">
          {Object.entries(groupedMachines).map(([key, { product, machines }]) => {
            // For environment and owner views, pass JSON droppableId to ProductColumn
            let extraDroppableProps = {};
            if (selectedView === 'environment') {
              extraDroppableProps = { droppableId: JSON.stringify({ environment: product?.id }) };
            } else if (selectedView === 'owner') {
              extraDroppableProps = { droppableId: JSON.stringify({ owner: product?.id }) };
            }
            return (
              <ProductColumn
                key={key}
                product={product}
                machines={machines}
                subProducts={product?.subProducts}
                selectedView={selectedView}
                {...extraDroppableProps}
              />
            );
          })}
        </div>
      </div>
    </DragDropContext>
  );
};

export default Board;
