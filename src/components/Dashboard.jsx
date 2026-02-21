import { TrendingDown, Package, FileText, DollarSign } from 'lucide-react';

export default function Dashboard({ stats, onQuickAction }) {
  const safeStats = {
    averageCost: Number(stats?.averageCost) || 0,
    totalIngredients: Number(stats?.totalIngredients) ?? 0,
    totalFormulas: Number(stats?.totalFormulas) ?? 0,
    savings: Number(stats?.savings) ?? 12,
    recentFormulas: Array.isArray(stats?.recentFormulas) ? stats.recentFormulas : [],
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-eco-dark">Dashboard</h2>
        <button
          onClick={() => onQuickAction('formulate')}
          className="btn-primary"
        >
          Nova Formulação
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Custo Médio</p>
              <p className="text-2xl font-bold text-eco-dark mt-1">
                R$ {safeStats.averageCost.toFixed(2)}
              </p>
              <p className="text-xs text-gray-500 mt-1">por tonelada</p>
            </div>
            <DollarSign className="w-10 h-10 text-eco-accent" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Ingredientes Cadastrados</p>
              <p className="text-2xl font-bold text-eco-dark mt-1">
                {safeStats.totalIngredients}
              </p>
              <p className="text-xs text-gray-500 mt-1">disponíveis para uso</p>
            </div>
            <Package className="w-10 h-10 text-eco-accent" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Fórmulas Criadas</p>
              <p className="text-2xl font-bold text-eco-dark mt-1">
                {safeStats.totalFormulas}
              </p>
              <p className="text-xs text-gray-500 mt-1">no histórico</p>
            </div>
            <FileText className="w-10 h-10 text-eco-accent" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Economia Estimada</p>
              <p className="text-2xl font-bold text-eco-dark mt-1">
                {safeStats.savings}%
              </p>
              <p className="text-xs text-gray-500 mt-1">vs. ração comercial</p>
            </div>
            <TrendingDown className="w-10 h-10 text-eco-accent" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl font-semibold text-eco-dark mb-4">Ações Rápidas</h3>
          <div className="space-y-3">
            <button
              onClick={() => onQuickAction('formulate-bovino')}
              className="w-full p-4 border-2 border-eco-light rounded-lg hover:bg-eco-light hover:bg-opacity-10 transition-colors text-left"
            >
              <div className="font-semibold text-eco-dark">Formular para Bovinos</div>
              <div className="text-sm text-gray-600">Crie uma ração otimizada</div>
            </button>
            <button
              onClick={() => onQuickAction('formulate-suino')}
              className="w-full p-4 border-2 border-eco-light rounded-lg hover:bg-eco-light hover:bg-opacity-10 transition-colors text-left"
            >
              <div className="font-semibold text-eco-dark">Formular para Suínos</div>
              <div className="text-sm text-gray-600">Nutrição balanceada</div>
            </button>
            <button
              onClick={() => onQuickAction('ingredients')}
              className="w-full p-4 border-2 border-eco-light rounded-lg hover:bg-eco-light hover:bg-opacity-10 transition-colors text-left"
            >
              <div className="font-semibold text-eco-dark">Gerenciar Insumos</div>
              <div className="text-sm text-gray-600">Atualizar preços e estoques</div>
            </button>
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-semibold text-eco-dark mb-4">Fórmulas Recentes</h3>
          {safeStats.recentFormulas.length > 0 ? (
            <div className="space-y-3">
              {safeStats.recentFormulas.map((formula, idx) => (
                <div key={idx} className="p-3 bg-gray-eco-light rounded-lg">
                  <div className="font-medium text-eco-dark">{formula.name}</div>
                  <div className="text-sm text-gray-600">
                    Custo: R$ {Number(formula.result?.cost ?? 0).toFixed(2)}/ton
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Nenhuma fórmula criada ainda</p>
              <button
                onClick={() => onQuickAction('formulate')}
                className="btn-primary mt-4"
              >
                Criar Primeira Fórmula
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
