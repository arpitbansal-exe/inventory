import React from 'react';
import useStore from '../store/store';

const ViewSelector = () => {
  const selectedView = useStore((state) => state.selectedView);
  const setView = useStore((state) => state.setView);
  
  const views = [
    { id: 'product', label: 'By Product' },
    { id: 'environment', label: 'By Environment' },
    { id: 'owner', label: 'By Owner' },
  ];
  
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-700">View:</span>
      <div className="flex bg-gray-100 rounded-lg p-1">
        {views.map(view => (
          <button
            key={view.id}
            onClick={() => setView(view.id)}
            className={`
              px-4 py-2 text-sm rounded-md transition-colors
              ${selectedView === view.id
                ? 'bg-white text-gray-900 shadow-sm font-medium'
                : 'text-gray-600 hover:text-gray-900'
              }
            `}
          >
            {view.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ViewSelector;
