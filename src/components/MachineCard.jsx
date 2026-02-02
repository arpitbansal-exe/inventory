import React, { useState } from 'react';
import { Monitor, Server, Cloud, AlertCircle } from 'lucide-react';
import useStore from '../store/store';
import MachineDetailsModal from './MachineDetailsModal';

const MachineCard = ({ machine, isDragging }) => {
  const [showModal, setShowModal] = useState(false);
  const tagColors = useStore((state) => state.tagColors);
  
  // Determine if machine has issues
  const hasIssues = 
    !machine.productId ||
    (machine.tags.includes('loaner') && machine.environment === 'prod') ||
    machine.status === 'decommissioned' ||
    machine.status === 'idle';
  
  // Machine type icon
  const TypeIcon = machine.type === 'vm' ? Monitor : machine.type === 'physical' ? Server : Cloud;
  
  // Environment colors
  const envColors = {
    'prod': 'border-red-500 text-red-700 bg-red-50',
    'staging': 'border-orange-500 text-orange-700 bg-orange-50',
    'dev': 'border-green-500 text-green-700 bg-green-50',
    'test': 'border-purple-500 text-purple-700 bg-purple-50',
  };
  
  return (
    <>
      <div
        className={`
          bg-white rounded-lg shadow-sm p-3 mb-2 border-l-4
          ${hasIssues ? 'border-l-red-500' : 'border-l-gray-300'}
          ${isDragging ? 'opacity-50' : 'hover:shadow-md'}
          transition-shadow cursor-move
        `}
      >
        {/* Hostname */}
        <div className="font-semibold text-gray-900 text-sm mb-2 truncate">
          {machine.hostname}
        </div>
        
        {/* Type and Environment */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1 text-gray-600 text-xs">
            <TypeIcon className="w-4 h-4" />
            <span>{machine.type}</span>
          </div>
          
          <span className={`px-2 py-0.5 rounded text-xs border ${envColors[machine.environment]}`}>
            {machine.environment}
          </span>
        </div>
        
        {/* Owner */}
        {machine.owner && (
          <div className="text-xs text-gray-500 mb-2 truncate">
            {machine.owner.split('@')[0]}
          </div>
        )}
        
        {/* Tags and Warning */}
        <div className="flex items-start gap-1 flex-wrap">
          {machine.tags.map((tag) => (
            <span
              key={tag}
              onMouseDown={(e) => e.stopPropagation()}
              draggable={false}
              className="px-2 py-0.5 rounded text-xs text-white font-medium cursor-pointer hover:opacity-80 select-none"
              style={{ backgroundColor: tagColors[tag] || '#6B7280' }}
            >
              {tag}
            </span>
          ))}
          
          {hasIssues && (
            <AlertCircle className="w-4 h-4 text-red-500 ml-auto" />
          )}
        </div>
      </div>
      
      <MachineDetailsModal
        machine={machine}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default MachineCard;
