import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// Paleta expandida com cores distintas para evitar duplicação
const COLORS = [
  '#52B788', // Verde claro
  '#40916C', // Verde médio
  '#2D6A4F', // Verde escuro
  '#95D5B2', // Verde muito claro
  '#1B4332', // Verde muito escuro
  '#B7E4C7', // Verde pastel claro
  '#D8F3DC', // Verde pastel muito claro
  '#6C9A8B', // Verde-azulado
  '#81B29A', // Verde-água
  '#A8D5BA', // Verde menta
  '#4A7C59', // Verde floresta
  '#7FB069', // Verde lima
  '#5D8A66', // Verde musgo
  '#9BC4A8', // Verde suave
  '#3E6B5E', // Verde petróleo
];

export default function FormulaResults({ result, constraints }) {
  if (!result || !result.solution || result.solution.length === 0) {
    return (
      <div className="card">
        <div className="text-center py-8 text-gray-500">
          <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p>Nenhuma fórmula calculada ainda</p>
        </div>
      </div>
    );
  }

  // Prepara dados para o gráfico de pizza - mostra TODOS os ingredientes com porcentagem > 0
  // Ordena do maior para o menor para melhor visualização
  const chartData = result.solution
    .filter(item => item.percentage > 0) // Mostra todos os ingredientes com porcentagem > 0
    .sort((a, b) => b.percentage - a.percentage) // Ordena do maior para o menor
    .map(item => ({
      name: item.ingredient.name,
      value: parseFloat(item.percentage.toFixed(2)),
    }));

  // Garante que a soma seja exatamente 100%
  const totalPercentage = chartData.reduce((sum, item) => sum + item.value, 0);
  if (Math.abs(totalPercentage - 100) > 0.01 && chartData.length > 0) {
    // Ajusta o maior item para garantir soma = 100%
    const adjustment = 100 - totalPercentage;
    chartData[0].value = parseFloat((chartData[0].value + adjustment).toFixed(2));
  }

  // Validação nutricional (com proteção se constraints vier undefined)
  const minProtein = constraints?.minProtein ?? 0;
  const minEnergy = constraints?.minEnergy ?? 0;
  const proteinMet = result.achievedProtein >= minProtein;
  const energyMet = result.achievedEnergy >= minEnergy;
  const allMet = proteinMet && energyMet;

  return (
    <div className="space-y-6">
      {/* Custo por Tonelada */}
      <div className="card">
        <h3 className="text-xl font-semibold text-eco-dark mb-4">
          Custo por Tonelada
        </h3>
        <div className="text-center py-6">
          <div className="text-5xl font-bold text-eco-accent mb-2">
            R$ {result.cost.toFixed(2)}
          </div>
          <p className="text-gray-600">por tonelada de ração</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="card">
          <h3 className="text-xl font-semibold text-eco-dark mb-4">
            Composição da Ração
          </h3>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="45%"
                  labelLine={true}
                  label={({ name, percent }) => {
                    // Mostra rótulo apenas se a porcentagem for >= 1% para evitar sobreposição
                    if (percent >= 0.01) {
                      return `${name}: ${(percent * 100).toFixed(1)}%`;
                    }
                    return '';
                  }}
                  outerRadius={90}
                  innerRadius={0}
                  fill="#8884d8"
                  dataKey="value"
                  paddingAngle={2}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`${value.toFixed(2)}%`, name]}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    padding: '8px'
                  }}
                />
                <Legend 
                  verticalAlign="bottom"
                  height={80}
                  iconType="circle"
                  wrapperStyle={{
                    paddingTop: '20px',
                    fontSize: '12px'
                  }}
                  formatter={(value) => {
                    const item = chartData.find(d => d.name === value);
                    return item ? `${value} (${item.value.toFixed(2)}%)` : value;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Dados insuficientes para gráfico
            </div>
          )}
        </div>

        {/* Nutritional Checklist */}
        <div className="card">
          <h3 className="text-xl font-semibold text-eco-dark mb-4">
            Validação Nutricional
          </h3>
          <div className="space-y-4">
            <div
              className={`p-4 rounded-lg border-2 ${
                proteinMet
                  ? 'border-green-500 bg-green-50'
                  : 'border-red-500 bg-red-50'
              }`}
            >
              <div className="flex items-center gap-3">
                {proteinMet ? (
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600" />
                )}
                <div className="flex-1">
                  <div className="font-semibold text-eco-dark">
                    Proteína Bruta (PB)
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Meta: {minProtein}% | Alcançado:{' '}
                    {result.achievedProtein.toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`p-4 rounded-lg border-2 ${
                energyMet
                  ? 'border-green-500 bg-green-50'
                  : 'border-red-500 bg-red-50'
              }`}
            >
              <div className="flex items-center gap-3">
                {energyMet ? (
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600" />
                )}
                <div className="flex-1">
                  <div className="font-semibold text-eco-dark">
                    Energia Digestível (ED)
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Meta: {minEnergy} Mcal/kg | Alcançado:{' '}
                    {result.achievedEnergy.toFixed(2)} Mcal/kg
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`p-4 rounded-lg border-2 ${
                allMet
                  ? 'border-green-500 bg-green-50'
                  : 'border-yellow-500 bg-yellow-50'
              }`}
            >
              <div className="flex items-center gap-3">
                {allMet ? (
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-yellow-600" />
                )}
                <div className="flex-1">
                  <div className="font-semibold text-eco-dark">
                    Status Geral
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {allMet
                      ? 'Todas as metas nutricionais foram atingidas!'
                      : 'Algumas metas nutricionais não foram atingidas. Ajuste os ingredientes ou requisitos.'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabela Detalhada */}
      <div className="card">
        <h3 className="text-xl font-semibold text-eco-dark mb-4">
          Composição Detalhada
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-eco-medium">
                <th className="text-left py-3 px-4 font-semibold text-eco-dark">
                  Ingrediente
                </th>
                <th className="text-right py-3 px-4 font-semibold text-eco-dark">
                  Percentual (%)
                </th>
                <th className="text-right py-3 px-4 font-semibold text-eco-dark">
                  Quantidade (kg/ton)
                </th>
                <th className="text-right py-3 px-4 font-semibold text-eco-dark">
                  Custo (R$/ton)
                </th>
              </tr>
            </thead>
            <tbody>
              {result.solution
                .filter(item => item.percentage > 0.01)
                .map((item, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-eco-medium hover:bg-gray-eco-light"
                  >
                    <td className="py-3 px-4 font-medium text-eco-dark">
                      {item.ingredient.name}
                    </td>
                    <td className="py-3 px-4 text-right text-gray-700">
                      {item.percentage.toFixed(2)}%
                    </td>
                    <td className="py-3 px-4 text-right text-gray-700">
                      {item.amount.toFixed(2)} kg
                    </td>
                    <td className="py-3 px-4 text-right text-gray-700">
                      R${' '}
                      {(
                        (item.amount / 1000) *
                        item.ingredient.pricePerKg
                      ).toFixed(2)}
                    </td>
                  </tr>
                ))}
            </tbody>
            <tfoot>
              <tr className="font-semibold text-eco-dark">
                <td className="py-3 px-4">Total</td>
                <td className="py-3 px-4 text-right">100.00%</td>
                <td className="py-3 px-4 text-right">1000.00 kg</td>
                <td className="py-3 px-4 text-right">
                  R$ {result.cost.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
