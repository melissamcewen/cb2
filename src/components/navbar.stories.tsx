import type { Meta, StoryObj } from '@storybook/react';
import Navbar from './navbar';

const meta = {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
    },
  },
  decorators: [
    (Story) => (
      <div data-theme="light">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithActiveLink: Story = {
  args: {},
  parameters: {
    nextjs: {
      router: {
        pathname: '/about',
      },
    },
  },
};

export const DarkTheme: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div data-theme="dark">
        <Story />
      </div>
    ),
  ],
};
