/**
 * Algoritmo Simplex simplificado para otimização de dieta de custo mínimo
 * 
 * Minimiza: c^T * x (custo total)
 * Sujeito a:
 *   - Restrições nutricionais: A * x >= b (PB e ED mínimas)
 *   - Restrições de soma: sum(x) = 1 (100% da ração)
 *   - Restrições de não-negatividade: x >= 0
 */

export function simplexOptimization(ingredients, constraints) {
  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    return { solution: [], cost: 0, achievedProtein: 0, achievedEnergy: 0, feasible: false };
  }

  const numIngredients = ingredients.length;
  const safeConstraints = constraints ?? {};

  // Coeficientes de custo (preços por kg)
  const c = ingredients.map(ing => Number(ing.pricePerKg) || 0);
  
  // Matriz de restrições nutricionais (PB em %, ED em Mcal/kg)
  const A = [
    ingredients.map(ing => (Number(ing.protein) || 0) / 100), // % PB
    ingredients.map(ing => Number(ing.energy) || 0),         // ED em Mcal/kg (não é %)
  ];
  
  // Lado direito das restrições (metas mínimas)
  const b = [
    (Number(safeConstraints.minProtein) || 0) / 100,
    Number(safeConstraints.minEnergy) || 0,  // ED em Mcal/kg
  ];

  // Inicialização: solução simples (distribuição uniforme)
  let x = new Array(numIngredients).fill(1 / numIngredients);
  
  // Verifica se a solução inicial é viável
  let feasible = checkFeasibility(x, A, b);
  
  if (!feasible) {
    // Tenta encontrar uma solução viável usando método de gradiente descendente simplificado
    x = findFeasibleSolution(A, b, c, numIngredients);
    feasible = checkFeasibility(x, A, b);
  }

  // Otimização iterativa (método simplificado)
  const maxIterations = 100;
  const learningRate = 0.01;
  
  for (let iter = 0; iter < maxIterations && feasible; iter++) {
    // Calcula gradiente do custo
    const gradient = [...c];
    
    // Ajusta solução na direção de menor custo
    const newX = [...x];
    for (let i = 0; i < numIngredients; i++) {
      newX[i] = Math.max(0, newX[i] - learningRate * gradient[i]);
    }
    
    // Normaliza para somar 1 (100%)
    const sum = newX.reduce((a, b) => a + b, 0);
    if (sum > 0) {
      for (let i = 0; i < numIngredients; i++) {
        newX[i] = newX[i] / sum;
      }
    }
    
    // Verifica se ainda é viável
    if (checkFeasibility(newX, A, b)) {
      const oldCost = x.reduce((sum, val, i) => sum + val * c[i], 0);
      const newCost = newX.reduce((sum, val, i) => sum + val * c[i], 0);
      
      // Aceita se reduzir o custo
      if (newCost < oldCost) {
        x = newX;
      } else {
        break; // Convergiu
      }
    } else {
      break; // Não é mais viável
    }
  }

  // Garante que a solução some exatamente 1 (100%)
  const currentSum = x.reduce((a, b) => a + b, 0);
  if (currentSum > 0 && Math.abs(currentSum - 1) > 0.0001) {
    // Normaliza para garantir soma = 1
    for (let i = 0; i < x.length; i++) {
      x[i] = x[i] / currentSum;
    }
  }

  // Calcula custo total por tonelada
  const costPerKg = x.reduce((sum, val, i) => sum + val * c[i], 0);
  const costPerTon = costPerKg * 1000;

  // Calcula valores nutricionais alcançados
  const achievedProtein = x.reduce((sum, val, i) => sum + val * (ingredients[i].protein || 0), 0);
  const achievedEnergy = x.reduce((sum, val, i) => sum + val * (ingredients[i].energy || 0), 0);

  // Prepara a solução incluindo TODOS os ingredientes, mesmo com porcentagem muito pequena
  const solution = x.map((val, i) => ({
    ingredient: ingredients[i],
    percentage: Math.max(0, val * 100), // Garante não-negatividade
    amount: Math.max(0, val * 1000), // kg por tonelada
  }));

  // Verifica e ajusta a soma para garantir exatamente 100%
  const totalPercentage = solution.reduce((sum, item) => sum + item.percentage, 0);
  if (Math.abs(totalPercentage - 100) > 0.01 && solution.length > 0) {
    const adjustment = 100 - totalPercentage;
    // Ajusta o maior ingrediente para garantir soma = 100%
    const maxIndex = solution.reduce((maxIdx, item, idx) => 
      item.percentage > solution[maxIdx].percentage ? idx : maxIdx, 0
    );
    solution[maxIndex].percentage = parseFloat((solution[maxIndex].percentage + adjustment).toFixed(2));
    solution[maxIndex].amount = parseFloat((solution[maxIndex].amount + adjustment * 10).toFixed(2));
  }

  return {
    solution,
    cost: costPerTon,
    achievedProtein,
    achievedEnergy,
    feasible: checkFeasibility(x, A, b),
  };
}

function checkFeasibility(x, A, b) {
  // Verifica restrições nutricionais
  for (let i = 0; i < A.length; i++) {
    const constraintValue = x.reduce((sum, val, j) => sum + val * A[i][j], 0);
    if (constraintValue < b[i] - 0.001) { // pequena tolerância
      return false;
    }
  }
  
  // Verifica soma = 1
  const sum = x.reduce((a, b) => a + b, 0);
  if (Math.abs(sum - 1) > 0.001) {
    return false;
  }
  
  // Verifica não-negatividade
  for (let val of x) {
    if (val < -0.001) {
      return false;
    }
  }
  
  return true;
}

function findFeasibleSolution(A, b, c, numIngredients) {
  // Método simplificado: começa com distribuição baseada nos ingredientes mais nutritivos
  let x = new Array(numIngredients).fill(0);
  
  // Prioriza ingredientes com melhor relação nutriente/preço
  const scores = c.map((cost, i) => {
    const proteinScore = A[0][i] / (cost + 0.01);
    const energyScore = A[1][i] / (cost + 0.01);
    return (proteinScore + energyScore) / 2;
  });
  
  // Seleciona os melhores ingredientes
  const sortedIndices = scores
    .map((score, i) => ({ score, i }))
    .sort((a, b) => b.score - a.score)
    .map(item => item.i);
  
  // Distribui proporcionalmente entre os melhores
  let remaining = 1;
  for (let idx of sortedIndices) {
    if (remaining > 0) {
      const allocation = Math.min(remaining, 0.3); // máximo 30% por ingrediente inicialmente
      x[idx] = allocation;
      remaining -= allocation;
    }
  }
  
  // Se ainda sobrar, distribui uniformemente
  if (remaining > 0.01) {
    for (let i = 0; i < numIngredients; i++) {
      x[i] += remaining / numIngredients;
    }
  }
  
  return x;
}
