/**
 * Perfis nutricionais por tipo de animal e fase
 */

export const animalProfiles = {
  bovino: {
    terminacao: {
      name: 'Bovino - Terminação',
      minProtein: 12, // % PB mínima
      minEnergy: 2.8, // Mcal/kg ED mínima
    },
    engorda: {
      name: 'Bovino - Engorda',
      minProtein: 11,
      minEnergy: 2.6,
    },
    recria: {
      name: 'Bovino - Recria',
      minProtein: 14,
      minEnergy: 2.7,
    },
  },
  suino: {
    terminacao: {
      name: 'Suíno - Terminação',
      minProtein: 14,
      minEnergy: 3.2,
    },
    crescimento: {
      name: 'Suíno - Crescimento',
      minProtein: 16,
      minEnergy: 3.4,
    },
    gestacao: {
      name: 'Suíno - Gestação',
      minProtein: 13,
      minEnergy: 3.0,
    },
  },
};

export const defaultIngredients = [
  {
    id: 1,
    name: 'Milho Grão',
    pricePerKg: 1.20,
    protein: 8.5,
    energy: 3.4,
  },
  {
    id: 2,
    name: 'Farelo de Soja',
    pricePerKg: 2.50,
    protein: 45.0,
    energy: 3.2,
  },
  {
    id: 3,
    name: 'Sorgo',
    pricePerKg: 1.10,
    protein: 9.0,
    energy: 3.1,
  },
  {
    id: 4,
    name: 'Farelo de Trigo',
    pricePerKg: 1.80,
    protein: 16.0,
    energy: 2.8,
  },
  {
    id: 5,
    name: 'Polpa Cítrica',
    pricePerKg: 1.50,
    protein: 7.0,
    energy: 2.9,
  },
  {
    id: 6,
    name: 'Casca de Soja',
    pricePerKg: 1.30,
    protein: 12.0,
    energy: 2.5,
  },
  {
    id: 7,
    name: 'DDG (Milho)',
    pricePerKg: 1.90,
    protein: 28.0,
    energy: 3.0,
  },
  {
    id: 8,
    name: 'Óleo Vegetal',
    pricePerKg: 4.50,
    protein: 0.0,
    energy: 8.8,
  },
  {
    id: 9,
    name: 'Calcário',
    pricePerKg: 0.80,
    protein: 0.0,
    energy: 0.0,
  },
  {
    id: 10,
    name: 'Fosfato Bicálcico',
    pricePerKg: 3.20,
    protein: 0.0,
    energy: 0.0,
  },
];
