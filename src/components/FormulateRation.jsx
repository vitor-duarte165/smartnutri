import { useState, useEffect } from 'react';
import { Calculator, RefreshCw } from 'lucide-react';
import { simplexOptimization } from '../utils/simplex';
import FormulaResults from './FormulaResults';
import AnimalProfile from './AnimalProfile';

export default function FormulateRation({ ingredients, onSaveFormula }) {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    if (Array.isArray(ingredients) && ingredients.length > 0) {
      setSelectedIds(ingredients.map(i => i.id));
    } else {
      setSelectedIds([]);
    }
  }, [ingredients]);

  const handleCalculate = () => {
    if (!selectedProfile || ingredients.length === 0) {
      alert('Por favor, selecione um perfil animal e certifique-se de ter ingredientes cadastrados.');
      return;
    }

    const allowedIngredients = ingredients.filter(ing => selectedIds.length === 0 || selectedIds.includes(ing.id));
    if (allowedIngredients.length === 0) {
      alert('Por favor, selecione pelo menos um ingrediente para a formulação.');
      return;
    }

    setIsCalculating(true);
    
    // Simula um pequeno delay para melhor UX
    setTimeout(() => {
      const constraints = {
        minProtein: selectedProfile.minProtein,
        minEnergy: selectedProfile.minEnergy,
      };

      const optimizationResult = simplexOptimization(allowedIngredients, constraints);
      setResult(optimizationResult);
      setIsCalculating(false);

      if (!optimizationResult.feasible) {
        alert('Não foi possível encontrar uma solução viável com os ingredientes e requisitos atuais. Tente ajustar os requisitos ou adicionar mais ingredientes.');
      }
    }, 500);
  };

  const handleSaveFormula = () => {
    if (result && result.feasible) {
      const formulaData = {
        name: `${selectedProfile.name} - ${new Date().toLocaleDateString()}`,
        profile: selectedProfile,
        result: result,
        date: new Date().toISOString(),
      };
      onSaveFormula(formulaData);
      alert('Fórmula salva com sucesso!');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-eco-dark">Formular Ração</h2>
      </div>

      {/* Seleção de Perfil */}
      <AnimalProfile onProfileSelect={setSelectedProfile} />

      {/* Seleção de ingredientes a serem considerados na otimização (lista estilizada) */}
      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-eco-dark">Ingredientes disponíveis</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedIds(ingredients.map(i => i.id))}
              className="btn-secondary px-3 py-1"
            >
              Selecionar todos
            </button>
            <button
              onClick={() => setSelectedIds([])}
              className="btn-ghost px-3 py-1"
            >
              Limpar
            </button>
          </div>
        </div>

        <ul className="divide-y divide-gray-100">
          {ingredients.map(ing => (
            <li
              key={ing.id}
              className={`flex items-center justify-between gap-4 p-3 hover:bg-gray-50 rounded ${selectedIds.includes(ing.id) ? 'bg-white' : 'bg-gray-50'}`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(ing.id)}
                  onChange={() => {
                    setSelectedIds(prev => {
                      const setPrev = new Set(prev);
                      if (setPrev.has(ing.id)) setPrev.delete(ing.id);
                      else setPrev.add(ing.id);
                      return Array.from(setPrev);
                    });
                  }}
                  className="w-4 h-4"
                />
                <div className="flex flex-col leading-tight">
                  <span className="font-medium text-eco-dark">{ing.name}</span>
                  <span className="text-xs text-gray-500">ID: {ing.id}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span className="px-2 py-1 bg-gray-100 rounded">R$ {Number(ing.pricePerKg).toFixed(2)}/kg</span>
                <span className="px-2 py-1 bg-gray-100 rounded">PB {Number(ing.protein).toFixed(1)}%</span>
                <span className="px-2 py-1 bg-gray-100 rounded">ED {Number(ing.energy).toFixed(2)}</span>
              </div>
            </li>
          ))}
        </ul>
        <p className="text-sm text-gray-600 mt-2">Marque os insumos que deseja incluir na otimização.</p>
      </div>

      {selectedProfile && (
        <>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-eco-dark mb-2">
                  Perfil Selecionado: {selectedProfile.name}
                </h3>
                <div className="text-sm text-gray-600">
                  <span className="mr-4">
                    PB mínima: {selectedProfile.minProtein}%
                  </span>
                  <span>
                    ED mínima: {selectedProfile.minEnergy} Mcal/kg
                  </span>
                </div>
              </div>
              <button
                onClick={handleCalculate}
                disabled={isCalculating}
                className="btn-primary flex items-center gap-2"
              >
                {isCalculating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Calculando...
                  </>
                ) : (
                  <>
                    <Calculator className="w-5 h-5" />
                    Calcular Otimização
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Resultados */}
          {result && (
            <>
              <FormulaResults
                result={result}
                constraints={{
                  minProtein: selectedProfile.minProtein,
                  minEnergy: selectedProfile.minEnergy,
                }}
              />
              {result.feasible && (
                <div className="card">
                  <button
                    onClick={handleSaveFormula}
                    className="btn-primary w-full md:w-auto"
                  >
                    Salvar Fórmula no Histórico
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
