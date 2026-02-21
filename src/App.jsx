import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import IngredientsTable from './components/IngredientsTable';
import FormulateRation from './components/FormulateRation';
import History from './components/History';
import { defaultIngredients } from './data/animalProfiles';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [ingredients, setIngredients] = useState([]);
  const [formulas, setFormulas] = useState([]);

  // Carrega ingredientes do localStorage ou usa os padrões
  useEffect(() => {
    const savedIngredients = localStorage.getItem('smartnutri-ingredients');
    if (savedIngredients) {
      setIngredients(JSON.parse(savedIngredients));
    } else {
      setIngredients(defaultIngredients);
      localStorage.setItem('smartnutri-ingredients', JSON.stringify(defaultIngredients));
    }

    const savedFormulas = localStorage.getItem('smartnutri-formulas');
    if (savedFormulas) {
      setFormulas(JSON.parse(savedFormulas));
    }
  }, []);

  // Salva ingredientes no localStorage quando mudam
  useEffect(() => {
    if (ingredients.length > 0) {
      localStorage.setItem('smartnutri-ingredients', JSON.stringify(ingredients));
    }
  }, [ingredients]);

  const handleUpdateIngredient = (id, updates) => {
    setIngredients(prev =>
      prev.map(ing =>
        ing.id === id ? { ...ing, ...updates } : ing
      )
    );
  };

  const handleSaveFormula = (formulaData) => {
    const newFormulas = [formulaData, ...formulas];
    setFormulas(newFormulas);
    localStorage.setItem('smartnutri-formulas', JSON.stringify(newFormulas));
  };

  const handleQuickAction = (action) => {
    if (action === 'formulate') {
      setActiveView('formulate');
    } else if (action === 'formulate-bovino') {
      setActiveView('formulate');
      // Poderia pré-selecionar bovino aqui se necessário
    } else if (action === 'formulate-suino') {
      setActiveView('formulate');
      // Poderia pré-selecionar suíno aqui se necessário
    } else if (action === 'ingredients') {
      setActiveView('ingredients');
    }
  };

  // Calcula estatísticas para o dashboard (com proteção contra dados inválidos)
  const validFormulas = Array.isArray(formulas) ? formulas.filter(f => f?.result?.cost != null) : [];
  const stats = {
    totalIngredients: Array.isArray(ingredients) ? ingredients.length : 0,
    totalFormulas: validFormulas.length,
    averageCost: validFormulas.length > 0
      ? validFormulas.reduce((sum, f) => sum + (f.result?.cost ?? 0), 0) / validFormulas.length
      : 0,
    savings: 12, // Valor estimado
    recentFormulas: validFormulas.slice(0, 5),
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard stats={stats} onQuickAction={handleQuickAction} />;
      case 'ingredients':
        return (
          <IngredientsTable
            ingredients={ingredients}
            onUpdateIngredient={handleUpdateIngredient}
          />
        );
      case 'formulate':
        return (
          <FormulateRation
            ingredients={ingredients}
            onSaveFormula={handleSaveFormula}
          />
        );
      case 'history':
        return <History formulas={formulas} />;
      default:
        return <Dashboard stats={stats} onQuickAction={handleQuickAction} />;
    }
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 ml-64 p-6 md:p-8 lg:p-10">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
