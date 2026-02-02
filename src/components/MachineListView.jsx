import React, { useState } from 'react';
import { Plus, List, LayoutGrid } from 'lucide-react';
import GrafanaFilterBar from './GrafanaFilterBar';
import useStore from '../store/store';
import MachineDetailsModal from './MachineDetailsModal';
import AddMachineModal from './AddMachineModal';

const MachineListView = ({ onViewChange }) => {
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const machines = useStore((state) => state.machines);
  const getFilteredMachines = useStore((state) => state.getFilteredMachines);
  const advancedFilters = useStore((state) => state.advancedFilters);
  const products = useStore((state) => state.products);
  const tagColors = useStore((state) => state.tagColors);
  
  const filteredMachines = getFilteredMachines();
  const totalMachines = machines.length;
  const displayedMachines = filteredMachines.length;
  
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Machine List</h1>
            <p className="text-sm text-gray-500 mt-1">
              Showing {displayedMachines} of {totalMachines} machines
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Machine
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => onViewChange('board')}
                className="p-2 rounded transition-colors text-gray-600 hover:bg-gray-100"
                title="Board View"
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => onViewChange('list')}
                className="p-2 rounded transition-colors bg-blue-100 text-blue-600"
                title="List View"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Filters */}
      <GrafanaFilterBar />
      
      {/* List */}
      <div className="flex-1 overflow-auto px-6 py-4">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Hostname</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Environment</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Product</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Owner</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Tags</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMachines.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                    No machines found
                  </td>
                </tr>
              ) : (
                filteredMachines.map((machine) => {
                  const product = products.find(p => p.id === machine.productId);
                  return (
                    <tr
                      key={machine.id}
                      onClick={() => setSelectedMachine(machine)}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {machine.hostname}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 capitalize">
                        {machine.type}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 capitalize">
                        {machine.environment}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {product?.name || 'Unassigned'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {machine.owner || '-'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 capitalize">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          machine.status === 'active' ? 'bg-green-100 text-green-800' :
                          machine.status === 'idle' ? 'bg-yellow-100 text-yellow-800' :
                          machine.status === 'inactive' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {machine.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex flex-wrap gap-1">
                          {machine.tags.map(tag => (
                            <span
                              key={tag}
                              onDoubleClick={(e) => {
                                e.stopPropagation();
                                setSelectedMachine(machine);
                              }}
                              className="px-2 py-1 rounded text-xs text-white font-medium cursor-pointer hover:opacity-80"
                              style={{ backgroundColor: tagColors[tag] || '#6B7280' }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Modals */}
      <MachineDetailsModal
        machine={selectedMachine}
        isOpen={!!selectedMachine}
        onClose={() => setSelectedMachine(null)}
      />
      
      <AddMachineModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </div>
  );
};

export default MachineListView;
