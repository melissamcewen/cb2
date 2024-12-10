import type { Meta, StoryObj } from '@storybook/react';
import EntryForm from './entry-form';

const meta = {
  title: 'Components/EntryForm',
  component: EntryForm,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof EntryForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onAnalyze: () => console.log('Analyze clicked'),
  },
};

export const WithSampleText: Story = {
  args: {
    ...Default.args,
  },
  play: async ({ canvasElement }) => {
    const textarea = canvasElement.querySelector('textarea');
    if (textarea) {
      textarea.value = 'Water, Sodium Lauryl Sulfate, Dimethicone';
    }
  },
};
