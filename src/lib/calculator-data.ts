import { towns } from "./towns";

export type TownCalculatorData = {
  slug: string;
  name: string;
  rent: {
    "1bhk": number;
    "2bhk": number;
    coliving: number | null;
  };
  groceries: number;
  mealOut: number;
  coworking: number | null;
  maid: number;
  utilitiesLPG: number;
};

export const mappedCalculatorData: TownCalculatorData[] = towns.map(town => ({
  slug: town.slug,
  name: town.name,
  rent: {
    "1bhk": (town.costOfLiving.rent1bhkRange[0] + town.costOfLiving.rent1bhkRange[1]) / 2,
    "2bhk": (town.costOfLiving.rent2bhkRange[0] + town.costOfLiving.rent2bhkRange[1]) / 2,
    coliving: town.costOfLiving.colivingPackage ? (town.costOfLiving.colivingPackage[0] + town.costOfLiving.colivingPackage[1]) / 2 : null,
  },
  groceries: (town.costOfLiving.groceriesCouple[0] + town.costOfLiving.groceriesCouple[1]) / 2,
  mealOut: town.costOfLiving.mealForTwo,
  coworking: town.costOfLiving.coworkingDesk ? (town.costOfLiving.coworkingDesk[0] + town.costOfLiving.coworkingDesk[1]) / 2 : null,
  maid: town.domesticHelp ? (town.domesticHelp.partTime[0] + town.domesticHelp.partTime[1]) / 2 : 0,
  utilitiesLPG: town.utilities.lpgCylinder,
}));

export const globalModifiers = {
  importedDietPremium: 8000,
  baseUtilities: 1500, // Electricity + basic water
  winterHeatingPremium: 4000,
  transport: {
    walk: 1500,
    scooty: 4000,
    taxi: 8000,
  }
};
