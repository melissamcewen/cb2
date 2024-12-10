import type { Meta, StoryObj } from '@storybook/react';
import ResultsCard from './results-card';
import { ResultState } from '@/types';

const meta = {
  title: 'Components/ResultsCard',
  component: ResultsCard,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ResultsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    state: ResultState.INFO,
    title: 'Analysis Complete',
    message: "We've analyzed your ingredients. See details below.",
  },
};

export const Warning: Story = {
  args: {
    state: ResultState.WARNING,
    title: 'Caution Required',
    message: 'Some ingredients may require special care.',
  },
};

export const Caution: Story = {
  args: {
    state: ResultState.CAUTION,
    title: 'Warning',
    message: 'Found ingredients that may be problematic.',
  },
};
