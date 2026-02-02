import React, { useState } from 'react';
import { X } from 'lucide-react';
import useStore from '../store/store';

const AddMachineModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    hostname: '',
    type: 'vm',
    productId: '',
    subProduct: '',
    environment: 'prod',
    owner: '',
    status: 'active',
    tags: [],
  });
  const [tagInput, setTagInput] = useState('');
  
  const addMachine = useStore((state) => state.addMachine);
  const products = useStore((state) => state.products);
  const getUniqueSubProducts = useStore((state) => state.getUniqueSubProducts);
  const getUniqueTags = useStore((state) => state.getUniqueTags);
  const getUniqueOwners = useStore((state) => state.getUniqueOwners);
  
  if (!isOpen) return null;
  
  const subProducts = getUniqueSubProducts();
  const availableTags = getUniqueTags();
  const owners = getUniqueOwners();
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddTag = (tag) => {
    if (!formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };
  
  const handleRemoveTag = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.hostname.trim()) {
      alert('Hostname is required');
      return;
    }
    
    addMachine(formData);
    setFormData({
      hostname: '',
      type: 'vm',
      productId: '',
      subProduct: '',
      environment: 'prod',
      owner: '',
      status: 'active',
      tags: [],
    });
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
        {/* Header */}
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Add New Machine</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4 max-h-96 overflow-y-auto">
          {/* Hostname */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hostname *
            </label>
            <input
              type="text"
              name="hostname"
              value={formData.hostname}
              onChange={handleInputChange}
              placeholder="e.g., server-01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          {/* Type & Environment */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="vm">VM</option>
                <option value="physical">Physical</option>
                <option value="cloud">Cloud</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Environment</label>
              <select
                name="environment"
                value={formData.environment}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="prod">Production</option>
                <option value="staging">Staging</option>
                <option value="dev">Development</option>
                <option value="test">Test</option>
              </select>
            </div>
          </div>
          
          {/* Product & Sub-Product */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
              <select
                name="productId"
                value={formData.productId}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select product...</option>
                {products.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sub-Product</label>
              <select
                name="subProduct"
                value={formData.subProduct}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select sub-product...</option>
                {subProducts.map(sp => (
                  <option key={sp} value={sp}>{sp}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Owner & Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Owner</label>
              <select
                name="owner"
                value={formData.owner}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select owner...</option>
                {owners.map(o => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="idle">Idle</option>
                <option value="decommissioned">Decommissioned</option>
              </select>
            </div>
          </div>
          
          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium flex items-center gap-1"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-blue-600"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <select
              value=""
              onChange={(e) => {
                if (e.target.value) {
                  handleAddTag(e.target.value);
                  e.target.value = '';
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Add tag...</option>
              {availableTags.map(tag => (
                <option key={tag} value={tag} disabled={formData.tags.includes(tag)}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
        </form>
        
        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded border border-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded transition-colors"
          >
            Add Machine
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMachineModal;
