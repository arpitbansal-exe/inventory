import React, { useState, useMemo, useEffect } from 'react';
import { X, Plus } from 'lucide-react';
import useStore from '../store/store';

const GrafanaFilterBar = () => {
  const [conditions, setConditions] = useState([]);
  const [isAddingFilter, setIsAddingFilter] = useState(false);
  const setAdvancedFilters = useStore((state) => state.setAdvancedFilters);
  const clearFilters = useStore((state) => state.clearFilters);
  
  const machines = useStore((state) => state.machines);
  const products = useStore((state) => state.products);
  const getUniqueEnvironments = useStore((state) => state.getUniqueEnvironments);
  const getUniqueOwners = useStore((state) => state.getUniqueOwners);
  const getUniqueTags = useStore((state) => state.getUniqueTags);
  const getUniqueStatuses = useStore((state) => state.getUniqueStatuses);
  const getUniqueSubProducts = useStore((state) => state.getUniqueSubProducts);
  
  // Encode/decode filters to/from URL
  const encodeFiltersToUrl = (conds) => {
    if (conds.length === 0) {
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      const encoded = btoa(JSON.stringify(conds.map(c => ({
        f: c.field,
        o: c.operator,
        v: c.value
      }))));
      window.history.replaceState({}, document.title, `${window.location.pathname}?f=${encoded}`);
    }
  };
  
  const decodeFiltersFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get('f');
    if (encoded) {
      try {
        const decoded = JSON.parse(atob(encoded));
        return decoded.map((item, idx) => ({
          id: Date.now() + idx,
          field: item.f,
          operator: item.o,
          value: item.v
        }));
      } catch (e) {
        console.error('Failed to decode filters:', e);
      }
    }
    return [];
  };
  
  // Sync URL when conditions change
  useEffect(() => {
    encodeFiltersToUrl(conditions);
  }, [conditions]);
  
  // Load filters from URL on mount
  useEffect(() => {
    const loadedConditions = decodeFiltersFromUrl();
    if (loadedConditions.length > 0) {
      setConditions(loadedConditions);
      setAdvancedFilters(loadedConditions);
    }
  }, []);
  
  // Memoize to avoid recalculating on every render
  const fields = useMemo(() => [
    { name: 'hostname', label: 'Hostname', type: 'text' },
    { name: 'productId', label: 'Product', type: 'select', options: products?.map(p => ({ value: p.id, label: p.name })) || [] },
    { name: 'environment', label: 'Environment', type: 'select', options: getUniqueEnvironments()?.map(e => ({ value: e, label: e })) || [] },
    { name: 'type', label: 'Type', type: 'select', options: [
      { value: 'vm', label: 'VM' },
      { value: 'physical', label: 'Physical' },
      { value: 'cloud', label: 'Cloud' },
    ]},
    { name: 'owner', label: 'Owner', type: 'select', options: getUniqueOwners()?.map(o => ({ value: o, label: o })) || [] },
    { name: 'tags', label: 'Tags', type: 'select', options: getUniqueTags()?.map(t => ({ value: t, label: t })) || [] },
    { name: 'status', label: 'Status', type: 'select', options: getUniqueStatuses()?.map(s => ({ value: s, label: s })) || [] },
    { name: 'subProduct', label: 'Sub-Product', type: 'select', options: getUniqueSubProducts()?.map(sp => ({ value: sp, label: sp })) || [] },
  ], [products, getUniqueEnvironments, getUniqueOwners, getUniqueTags, getUniqueStatuses, getUniqueSubProducts]);
  
  const operators = {
    text: ['equals', 'contains', 'starts with', 'ends with'],
    select: ['equals', 'is any of'],
  };
  
  const addCondition = () => {
    const newCondition = {
      id: Date.now(),
      field: 'productId',
      operator: 'equals',
      value: '',
    };
    const updated = [...conditions, newCondition];
    setConditions(updated);
    setAdvancedFilters(updated);
  };
  
  const removeCondition = (id) => {
    const updated = conditions.filter(c => c.id !== id);
    setConditions(updated);
    setAdvancedFilters(updated);
  };
  
  const updateCondition = (id, key, val) => {
    const updated = conditions.map(c =>
      c.id === id ? { ...c, [key]: val } : c
    );
    setConditions(updated);
    setAdvancedFilters(updated);
  };
  
  const getFieldConfig = (fieldName) => {
    return fields.find(f => f.name === fieldName);
  };
  
  const getOperatorOptions = (fieldName) => {
    const field = getFieldConfig(fieldName);
    return operators[field?.type] || operators.text;
  };
  
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700">Filters</h3>
        <div className="flex gap-2">
          {conditions.length > 0 && (
            <button
              onClick={() => {
                setConditions([]);
                clearFilters();
                setAdvancedFilters([]);
              }}
              className="px-2 py-1 text-xs text-gray-600 hover:text-red-600 underline transition-colors"
            >
              Clear All
            </button>
          )}
          <button
            onClick={() => setIsAddingFilter(!isAddingFilter)}
            className="px-2 py-1 text-xs bg-blue-600 text-white hover:bg-blue-700 rounded flex items-center gap-1 transition-colors"
          >
            <Plus className="w-3 h-3" />
            Add
          </button>
        </div>
      </div>

      {/* Conditions - Inline Horizontal Layout */}
      {conditions.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {conditions.map((condition, index) => {
            const fieldConfig = getFieldConfig(condition.field);
            const operatorOpts = getOperatorOptions(condition.field);
            
            return (
              <div key={condition.id} className="flex items-center gap-1 bg-gray-50 p-2 rounded border border-gray-200 whitespace-nowrap">
                {/* AND label */}
                {index > 0 && (
                  <span className="text-xs font-bold text-gray-500 px-1">AND</span>
                )}
                
                {/* Field */}
                <select
                  value={condition.field}
                  onChange={(e) => updateCondition(condition.id, 'field', e.target.value)}
                  className="text-xs px-1.5 py-0.5 rounded border border-gray-300 bg-white"
                >
                  {fields.map(field => (
                    <option key={field.name} value={field.name}>{field.label}</option>
                  ))}
                </select>
                
                {/* Operator */}
                <select
                  value={condition.operator}
                  onChange={(e) => updateCondition(condition.id, 'operator', e.target.value)}
                  className="text-xs px-1.5 py-0.5 rounded border border-gray-300 bg-white"
                >
                  {operatorOpts.map(op => (
                    <option key={op} value={op}>{op}</option>
                  ))}
                </select>
                
                {/* Value */}
                {fieldConfig?.type === 'select' ? (
                  <select
                    value={condition.value}
                    onChange={(e) => updateCondition(condition.id, 'value', e.target.value)}
                    className="text-xs px-1.5 py-0.5 rounded border border-gray-300 bg-white"
                  >
                    <option value="">Select</option>
                    {fieldConfig?.options?.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={condition.value}
                    onChange={(e) => updateCondition(condition.id, 'value', e.target.value)}
                    placeholder="value"
                    className="text-xs px-1.5 py-0.5 rounded border border-gray-300 bg-white w-20"
                  />
                )}
                
                {/* Remove */}
                <button
                  onClick={() => removeCondition(condition.id)}
                  className="p-0.5 text-gray-400 hover:text-red-600 rounded transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Filter Row */}
      {isAddingFilter && (
        <div className="flex items-center gap-2 bg-blue-50 p-2 rounded border border-blue-200 mb-3">
          {conditions.length > 0 && <span className="text-xs font-bold text-gray-500 px-1.5">AND</span>}
          
          <select
            onChange={(e) => {
              if (e.target.value) {
                const newCondition = {
                  id: Date.now(),
                  field: e.target.value,
                  operator: 'equals',
                  value: '',
                };
                const updated = [...conditions, newCondition];
                setConditions(updated);
                setAdvancedFilters(updated);
              }
              setIsAddingFilter(false);
            }}
            className="text-xs px-2 py-1 rounded border border-gray-300 bg-white flex-1 min-w-0"
            defaultValue=""
          >
            <option value="">Select field...</option>
            {fields.map(field => (
              <option key={field.name} value={field.name}>{field.label}</option>
            ))}
          </select>
          
          <button
            onClick={() => setIsAddingFilter(false)}
            className="text-xs text-gray-500 hover:text-gray-700 underline"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Active Filters Summary */}
      {conditions.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="text-gray-600 font-medium">Active:</span>
          {conditions.map((condition, idx) => {
            const fieldConfig = getFieldConfig(condition.field);
            const valueLabel = fieldConfig?.options?.find(o => o.value === condition.value)?.label || condition.value || '(empty)';
            return (
              <span key={condition.id} className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-medium">
                {fieldConfig?.label} {condition.operator} <strong>{valueLabel}</strong>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GrafanaFilterBar;
