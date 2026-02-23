import { useState, useEffect } from 'react';
import { Edit2, Save, X } from 'lucide-react';

export default function IngredientsTable({ ingredients, onUpdateIngredient }) {
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [selectAll, setSelectAll] = useState(false);

  const handleEdit = (ingredient) => {
    setEditingId(ingredient.id);
    setEditValues({
      pricePerKg: ingredient.pricePerKg,
      protein: ingredient.protein,
      energy: ingredient.energy,
    });
  };

  const handleSave = (id) => {
    onUpdateIngredient(id, editValues);
    setEditingId(null);
    setEditValues({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValues({});
  };

  const handleChange = (field, value) => {
    setEditValues(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0,
    }));
  };

  useEffect(() => {
    if (Array.isArray(ingredients) && ingredients.length > 0) {
      const allEnabled = ingredients.every(ing => ing.enabled !== false);
      setSelectAll(allEnabled);
    }
  }, [ingredients]);

  const handleToggleAll = (checked) => {
    setSelectAll(checked);
    ingredients.forEach(ing => {
      onUpdateIngredient(ing.id, { enabled: checked });
    });
  };

  

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-eco-dark">Gerenciar Insumos</h2>
        <p className="text-gray-600">
          {ingredients.length} ingredientes cadastrados
        </p>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-eco-medium">
              <th className="text-center py-3 px-4 font-semibold text-eco-dark">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-control"
                    checked={selectAll}
                    onChange={(e) => handleToggleAll(e.target.checked)}
                    aria-label="Selecionar todos"
                  />
                </label>
              </th>
              <th className="text-left py-3 px-4 font-semibold text-eco-dark">Ingrediente</th>
              <th className="text-right py-3 px-4 font-semibold text-eco-dark">Preço/kg (R$)</th>
              <th className="text-right py-3 px-4 font-semibold text-eco-dark">% PB</th>
              <th className="text-right py-3 px-4 font-semibold text-eco-dark">ED (Mcal/kg)</th>
              <th className="text-center py-3 px-4 font-semibold text-eco-dark">Ações</th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map((ingredient) => (
              <tr
                key={ingredient.id}
                className="border-b border-gray-eco-medium hover:bg-gray-eco-light transition-colors"
              >
                <td className="py-3 px-4 text-center">
                  <label className="checkbox-label mx-auto">
                    <input
                      type="checkbox"
                      className="checkbox-control"
                      checked={ingredient.enabled !== false}
                      onChange={(e) => onUpdateIngredient(ingredient.id, { enabled: e.target.checked })}
                      aria-label={`Ativar ${ingredient.name}`}
                    />
                  </label>
                </td>
                <td className="py-3 px-4 font-medium text-eco-dark">
                  {ingredient.name}
                </td>
                <td className="py-3 px-4 text-right">
                  {editingId === ingredient.id ? (
                    <input
                      type="number"
                      step="0.01"
                      value={editValues.pricePerKg}
                      onChange={(e) => handleChange('pricePerKg', e.target.value)}
                      className="input-field w-24 text-right"
                      aria-label="Preço por kg"
                    />
                  ) : (
                    <span className="text-gray-700">
                      R$ {ingredient.pricePerKg.toFixed(2)}
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 text-right">
                  {editingId === ingredient.id ? (
                    <input
                      type="number"
                      step="0.1"
                      value={editValues.protein}
                      onChange={(e) => handleChange('protein', e.target.value)}
                      className="input-field w-20 text-right"
                      aria-label="Proteína bruta"
                    />
                  ) : (
                    <span className="text-gray-700">
                      {ingredient.protein.toFixed(1)}%
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 text-right">
                  {editingId === ingredient.id ? (
                    <input
                      type="number"
                      step="0.1"
                      value={editValues.energy}
                      onChange={(e) => handleChange('energy', e.target.value)}
                      className="input-field w-20 text-right"
                      aria-label="Energia digestível"
                    />
                  ) : (
                    <span className="text-gray-700">
                      {ingredient.energy.toFixed(2)}
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 text-center">
                  {editingId === ingredient.id ? (
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleSave(ingredient.id)}
                        className="p-1 text-eco-accent hover:bg-eco-light hover:bg-opacity-20 rounded"
                        aria-label="Salvar"
                      >
                        <Save className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="p-1 text-red-500 hover:bg-red-50 rounded"
                        aria-label="Cancelar"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEdit(ingredient)}
                      className="p-1 text-eco-accent hover:bg-eco-light hover:bg-opacity-20 rounded"
                      aria-label="Editar"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
