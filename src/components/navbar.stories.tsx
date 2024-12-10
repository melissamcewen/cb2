import type { Meta, StoryObj } from '@storybook/react';
import Navbar from './navbar';

const meta = {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',  // Use fullscreen for nav
    backgrounds: {
      default: 'light',
    },
  },
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
