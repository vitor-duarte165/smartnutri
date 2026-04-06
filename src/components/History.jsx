import { Calendar, DollarSign, CheckCircle2 } from 'lucide-react';

export default function History({ formulas }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-eco-dark">Histórico de Fórmulas</h2>
        <p className="text-gray-600">
          {formulas.length} fórmula{formulas.length !== 1 ? 's' : ''} salva{formulas.length !== 1 ? 's' : ''}
        </p>
      </div>

      {formulas.length === 0 ? (
        <div className="card">
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 text-lg mb-2">
              Nenhuma fórmula salva ainda
            </p>
            <p className="text-gray-500">
              Crie e salve sua primeira fórmula para ver o histórico aqui
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {formulas.map((formula, idx) => {
            const res = formula?.result;
            const profile = formula?.profile;
            if (!res) return null;
            return (
              <div key={idx} className="card hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-eco-dark mb-2">
                      {formula.name ?? 'Fórmula sem nome'}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formula.date
                          ? new Date(formula.date).toLocaleDateString('pt-BR', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : '—'}
                      </div>
                      {profile?.name && (
                        <div>Perfil: {profile.name}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Custo</div>
                      <div className="text-2xl font-bold text-eco-accent">
                        R$ {Number(res.cost ?? 0).toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-500">por tonelada</div>
                    </div>
                    <div className="flex flex-col items-center">
                      {res.feasible ? (
                        <>
                          <CheckCircle2 className="w-8 h-8 text-green-500 mb-1" />
                          <span className="text-xs text-green-600">Viável</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-8 h-8 text-red-500 mb-1" />
                          <span className="text-xs text-red-600">Inválida</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-eco-medium">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">PB Alcançada:</span>
                      <span className="font-semibold text-eco-dark ml-2">
                        {Number(res.achievedProtein ?? 0).toFixed(2)}%
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">ED Alcançada:</span>
                      <span className="font-semibold text-eco-dark ml-2">
                        {Number(res.achievedEnergy ?? 0).toFixed(2)} Mcal/kg
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Ingredientes:</span>
                      <span className="font-semibold text-eco-dark ml-2">
                        {Array.isArray(res.solution) ? res.solution.filter(i => (i?.percentage ?? 0) > 0.01).length : 0}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Total:</span>
                      <span className="font-semibold text-eco-dark ml-2">
                        {Array.isArray(res.solution) ? res.solution.reduce((sum, i) => sum + (i?.percentage ?? 0), 0).toFixed(2) : 0}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ); 
          })}
        </div>
      )}
    </div>
  );
}
