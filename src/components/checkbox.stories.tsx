import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from './checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default Checkbox',
    checked: false,
    onChange: (checked) => console.log('Checkbox changed:', checked),
  },
};

export const Checked: Story = {
  args: {
    ...Default.args,
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    ...Default.args,
    indeterminate: true,
    onExpand: () => console.log('Expand clicked'),
  },
};

export const WithMoreOptions: Story = {
  args: {
    ...Indeterminate.args,
    label: 'Silicones',
  },
};
