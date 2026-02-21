import { useState } from 'react';
import { Save } from 'lucide-react';
import { animalProfiles } from '../data/animalProfiles';

export default function AnimalProfile({ onProfileSelect }) {
  const [selectedAnimal, setSelectedAnimal] = useState('');
  const [selectedPhase, setSelectedPhase] = useState('');

  const handleAnimalChange = (animal) => {
    setSelectedAnimal(animal);
    setSelectedPhase(''); // Reset phase when animal changes
  };

  const handleSave = () => {
    if (selectedAnimal && selectedPhase) {
      const profile = animalProfiles[selectedAnimal][selectedPhase];
      onProfileSelect({
        animal: selectedAnimal,
        phase: selectedPhase,
        ...profile,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-eco-dark">Perfil do Animal</h2>
        <p className="text-gray-600 mt-2">
          Selecione o tipo de animal e a fase para definir os requisitos nutricionais
        </p>
      </div>

      <div className="card">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-eco-dark mb-2">
              Tipo de Animal
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => handleAnimalChange('bovino')}
                className={`p-4 border-2 rounded-lg transition-colors text-left ${
                  selectedAnimal === 'bovino'
                    ? 'border-eco-accent bg-eco-light bg-opacity-10'
                    : 'border-gray-eco-medium hover:border-eco-light'
                }`}
              >
                <div className="font-semibold text-eco-dark">Bovino</div>
                <div className="text-sm text-gray-600 mt-1">
                  Gado de corte e leite
                </div>
              </button>
              <button
                onClick={() => handleAnimalChange('suino')}
                className={`p-4 border-2 rounded-lg transition-colors text-left ${
                  selectedAnimal === 'suino'
                    ? 'border-eco-accent bg-eco-light bg-opacity-10'
                    : 'border-gray-eco-medium hover:border-eco-light'
                }`}
              >
                <div className="font-semibold text-eco-dark">Suíno</div>
                <div className="text-sm text-gray-600 mt-1">
                  Porcos e leitões
                </div>
              </button>
            </div>
          </div>

          {selectedAnimal && (
            <div>
              <label className="block text-sm font-semibold text-eco-dark mb-2">
                Fase de Produção
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.keys(animalProfiles[selectedAnimal]).map((phase) => {
                  const profile = animalProfiles[selectedAnimal][phase];
                  return (
                    <button
                      key={phase}
                      onClick={() => setSelectedPhase(phase)}
                      className={`p-4 border-2 rounded-lg transition-colors text-left ${
                        selectedPhase === phase
                          ? 'border-eco-accent bg-eco-light bg-opacity-10'
                          : 'border-gray-eco-medium hover:border-eco-light'
                      }`}
                    >
                      <div className="font-semibold text-eco-dark">
                        {profile.name.split(' - ')[1]}
                      </div>
                      <div className="text-xs text-gray-600 mt-2">
                        <div>PB mínima: {profile.minProtein}%</div>
                        <div>ED mínima: {profile.minEnergy} Mcal/kg</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {selectedAnimal && selectedPhase && (
            <div className="pt-4 border-t border-gray-eco-medium">
              <div className="bg-eco-light bg-opacity-10 p-4 rounded-lg mb-4">
                <h3 className="font-semibold text-eco-dark mb-2">
                  Requisitos Nutricionais Selecionados:
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Proteína Bruta (PB):</span>
                    <span className="font-semibold text-eco-dark ml-2">
                      {animalProfiles[selectedAnimal][selectedPhase].minProtein}%
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Energia Digestível (ED):</span>
                    <span className="font-semibold text-eco-dark ml-2">
                      {animalProfiles[selectedAnimal][selectedPhase].minEnergy} Mcal/kg
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleSave}
                className="btn-primary w-full md:w-auto"
              >
                <Save className="w-5 h-5 inline mr-2" />
                Salvar Perfil
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
