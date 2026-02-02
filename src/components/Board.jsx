import React from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import useStore from '../store/store';
import ProductColumn from './ProductColumn';

const Board = () => {
  const products = useStore((state) => state.products);
  const machines = useStore((state) => state.machines);
  const getFilteredMachines = useStore((state) => state.getFilteredMachines);
  const moveMachine = useStore((state) => state.moveMachine);
  const selectedView = useStore((state) => state.selectedView);
  const advancedFilters = useStore((state) => state.advancedFilters);
  
  const filteredMachines = getFilteredMachines();
  
  // Handle drag and drop
  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    // Dropped outside any droppable
    if (!destination) return;

    // Dropped in same place
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Parse destination droppableId
    // Format: "productId-subProduct" or "productId-none" or "unassigned-empty" or "env-none" or "owner-none"
    const parts = destination.droppableId.split('-');
    let destProductId = parts[0];
    let destSubProduct = parts.slice(1).join('-');

    let newProductId = null;
    let newSubProduct = null;

    if (selectedView === 'product') {
      // Handle unassigned and empty cases
      newProductId = destProductId === 'unassigned' ? null : destProductId;
      newSubProduct = (destSubProduct === 'none' || destSubProduct === 'empty' || destSubProduct === '_all' || destSubProduct === '_ungrouped') ? null : destSubProduct;
      // Defensive: if subProduct is empty string, set to null
      if (newSubProduct === '') newSubProduct = null;
      // Log for debugging
      console.log('Moving machine', draggableId, 'to', newProductId, newSubProduct, '(from', source.droppableId, 'to', destination.droppableId, ')');
      moveMachine(draggableId, newProductId, newSubProduct);
    } else {
      // For other views, do not update productId/subProduct
      // Optionally, you could update environment/owner here if desired
      // console.log('Drag in non-product view:', selectedView);
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
          {Object.entries(groupedMachines).map(([key, { product, machines }]) => (
            <ProductColumn
              key={key}
              product={product}
              machines={machines}
              subProducts={product?.subProducts}
            />
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default Board;
