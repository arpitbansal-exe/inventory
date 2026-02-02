import React from 'react';
import { Link } from 'react-router-dom';
import { List, LayoutGrid } from 'lucide-react';
import ViewSelector from '../components/ViewSelector';
import GrafanaFilterBar from '../components/GrafanaFilterBar';
import Board from '../components/Board';
import useStore from '../store/store';

const BoardPage = () => {
  const machines = useStore((state) => state.machines);
  const getFilteredMachines = useStore((state) => state.getFilteredMachines);
  
  const totalMachines = machines.length;
  const filteredMachines = getFilteredMachines();
  const displayedMachines = filteredMachines.length;
  
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Machine Inventory</h1>
            <p className="text-sm text-gray-500 mt-1">
              Showing {displayedMachines} of {totalMachines} machines
            </p>
          </div>
          <div className="flex items-center gap-4">
            <ViewSelector />
            <div className="flex gap-2">
              <button
                className="p-2 rounded transition-colors bg-blue-100 text-blue-600"
                title="Board View"
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <Link
                to="/list"
                className="p-2 rounded transition-colors text-gray-600 hover:bg-gray-100 flex items-center justify-center"
                title="List View"
              >
                <List className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      {/* Filters */}
      <GrafanaFilterBar />
      
      {/* Board */}
      <Board />
    </div>
  );
};

export default BoardPage;
