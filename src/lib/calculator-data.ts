export type TownCostData = {
  slug: string;
  name: string;
  rent: {
    "1bhk": number;
    "2bhk": number;
    "3bhk": number;
    coliving: number;
  };
};

export const calculatorData: TownCostData[] = [
  {
    slug: "dharamshala",
    name: "Dharamshala / McLeodganj",
    rent: { "1bhk": 18000, "2bhk": 25000, "3bhk": 35000, coliving: 25000 },
  },
  {
    slug: "manali",
    name: "Manali / Naggar",
    rent: { "1bhk": 20000, "2bhk": 30000, "3bhk": 45000, coliving: 30000 },
  },
  {
    slug: "palampur",
    name: "Palampur",
    rent: { "1bhk": 12000, "2bhk": 18000, "3bhk": 25000, coliving: 18000 },
  },
  {
    slug: "shimla",
    name: "Shimla",
    rent: { "1bhk": 22000, "2bhk": 35000, "3bhk": 50000, coliving: 30000 },
  },
  {
    slug: "bir",
    name: "Bir Billing",
    rent: { "1bhk": 15000, "2bhk": 22000, "3bhk": 30000, coliving: 20000 },
  },
  {
    slug: "solan",
    name: "Solan",
    rent: { "1bhk": 10000, "2bhk": 16000, "3bhk": 22000, coliving: 15000 },
  },
];

export const modifiers = {
  food: {
    local: 8000,
    mixed: 15000,
    imported: 25000,
  },
  utilities: {
    base: 3000,
    winterHeating: 4500,
  },
  lifestyle: {
    internet: 1500,
    coworking: 6000,
    transport: 2500,
  },
};
