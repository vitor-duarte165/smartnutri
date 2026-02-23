import { useState, useEffect } from 'react';
import { Calculator, RefreshCw } from 'lucide-react';
import { simplexOptimization } from '../utils/simplex';
import { useState } from 'react';
import { Calculator, RefreshCw } from 'lucide-react';
import { simplexOptimization } from '../utils/simplex';
import FormulaResults from './FormulaResults';
import AnimalProfile from './AnimalProfile';

export default function FormulateRation({ ingredients, onSaveFormula }) {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = () => {
    if (!selectedProfile || ingredients.length === 0) {
      alert('Por favor, selecione um perfil animal e certifique-se de ter ingredientes cadastrados.');
      return;
    }

    setIsCalculating(true);
    
    // Simula um pequeno delay para melhor UX
    setTimeout(() => {
      const constraints = {
        minProtein: selectedProfile.minProtein,
        minEnergy: selectedProfile.minEnergy,
      };

      const optimizationResult = simplexOptimization(ingredients, constraints);
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
          ))}
