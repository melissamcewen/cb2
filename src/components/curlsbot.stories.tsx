import type { Meta, StoryObj } from '@storybook/react';
import Curlsbot from './curlsbot';

const meta = {
  title: 'Components/Curlsbot',
  component: Curlsbot,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div className="container mx-auto px-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Curlsbot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithResults: Story = {
  args: {},
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/',
        query: { showResults: 'true' },
      },
    },
  },
  play: async ({ canvasElement }) => {
    const textarea = canvasElement.querySelector('textarea');
    if (textarea) {
      textarea.value = 'Water, Sodium Lauryl Sulfate, Dimethicone';
      const analyzeButton = canvasElement.querySelector('.btn-primary');
      if (analyzeButton) {
        (analyzeButton as HTMLButtonElement).click();
      }
    }
  },
};


export const WithPreferences: Story = {
  args: {},
  parameters: {
    preferences: {
      'water-soluble': true,
      'non-water-soluble': false,
      'waxes': true,
    },
  },
};
