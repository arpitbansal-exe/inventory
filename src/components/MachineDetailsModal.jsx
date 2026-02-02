import React, { useState } from 'react';
import { X, Trash2, Edit2 } from 'lucide-react';
import useStore from '../store/store';

const MachineDetailsModal = ({ machine, isOpen, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(machine || {});
  const updateMachine = useStore((state) => state.updateMachine);
  const deleteMachine = useStore((state) => state.deleteMachine);
  const products = useStore((state) => state.products);
  const tagColors = useStore((state) => state.tagColors);
  
  if (!isOpen || !machine) return null;
  
  React.useEffect(() => {
    setEditData(machine);
  }, [machine]);
  
  const productName = products.find(p => p.id === machine.productId)?.name || 'Unassigned';
  
  const handleSave = () => {
    updateMachine(machine.id, editData);
    setIsEditing(false);
  };
  
  const handleDelete = () => {
    if (window.confirm(`Delete machine ${machine.hostname}?`)) {
      deleteMachine(machine.id);
      onClose();
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{machine.hostname}</h2>
            <p className="text-sm text-gray-500">{machine.id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Content */}
        <div className="px-6 py-4 space-y-4">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">Hostname</label>
                <input
                  type="text"
                  value={editData.hostname || ''}
                  onChange={(e) => setEditData({ ...editData, hostname: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">Owner</label>
                <input
                  type="text"
                  value={editData.owner || ''}
                  onChange={(e) => setEditData({ ...editData, owner: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">Status</label>
                <select
                  value={editData.status || ''}
                  onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="idle">Idle</option>
                  <option value="decommissioned">Decommissioned</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">Sub-Product</label>
                <input
                  type="text"
                  value={editData.subProduct || ''}
                  onChange={(e) => setEditData({ ...editData, subProduct: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-600">Type</label>
                  <p className="text-sm font-medium text-gray-900 capitalize">{machine.type}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600">Environment</label>
                  <p className="text-sm font-medium text-gray-900 capitalize">{machine.environment}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600">Product</label>
                  <p className="text-sm font-medium text-gray-900">{productName}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600">Sub-Product</label>
                  <p className="text-sm font-medium text-gray-900">{machine.subProduct || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600">Owner</label>
                  <p className="text-sm font-medium text-gray-900">{machine.owner || 'Unassigned'}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600">Status</label>
                  <p className="text-sm font-medium text-gray-900 capitalize">{machine.status}</p>
                </div>
              </div>
              
              <div>
                <label className="text-xs font-semibold text-gray-600">Tags</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {machine.tags.length > 0 ? (
                    machine.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs rounded text-white font-medium"
                        style={{ backgroundColor: tagColors[tag] || '#6B7280' }}
                      >
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-gray-500">No tags</span>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
        
        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-2">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-2 text-xs text-gray-600 hover:bg-gray-100 rounded border border-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-3 py-2 text-xs text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors"
              >
                Save Changes
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-2 text-xs text-blue-600 hover:bg-blue-50 rounded flex items-center gap-1 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded flex items-center gap-1 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
              <button
                onClick={onClose}
                className="px-3 py-2 text-xs text-gray-600 hover:bg-gray-100 rounded border border-gray-300 transition-colors"
              >
                Close
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MachineDetailsModal;
