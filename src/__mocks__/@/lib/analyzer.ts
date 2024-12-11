import type { AnalysisResult } from 'haircare-ingredients-analyzer';

const mockAnalyze = jest.fn().mockReturnValue({
  matches: [
    {
      text: 'Sodium Lauryl Sulfate',
      categories: ['Sulfate', 'Cleanser'],
      confidence: 1,
      matchType: 'exact',
      description: 'A strong cleansing agent that can be drying to hair and skin.',
      notes: 'Common in shampoos and cleansers'
    },
    {
      text: 'Dimethicone',
      categories: ['Silicone'],
      confidence: 0.8,
      matchType: 'exact',
      description: 'A silicone that forms a barrier on hair. May cause buildup.',
      notes: 'Common in conditioners and styling products'
    }
  ]
} as AnalysisResult);

export const analyzer = {
  analyze: mockAnalyze,
  database: {
    ingredients: [],
    categories: {}
  }
};

export default analyzer;
