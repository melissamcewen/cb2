import { alcohols } from './alcohols';
import { cleansers } from './cleansers';
import { silicones } from './silicones';
import { other } from './other';
import type { Ingredient } from 'haircare-ingredients-analyzer';


export const testIngredients: Ingredient[] = [
  ...alcohols,
  ...cleansers,
  ...silicones,
  ...other,
];