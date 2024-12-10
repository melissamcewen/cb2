import type { Preview } from '@storybook/react';
import React from 'react';
import '../src/app/globals.css'; // Import your app's styles

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  globalTypes: {
    theme: {
      name: 'DaisyUI Theme',
      description: 'DaisyUI theme for components',
      defaultValue: 'light',
      toolbar: {
        // Show as a dropdown in Storybook toolbar
        icon: 'paintbrush',
        items: [
          'light',
          'dark',
          'cupcake',
          'synthwave',
          'retro',
          'cyberpunk',
          'valentine',
          'garden',
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      return React.createElement('div',
        {
          'data-theme': context.globals.theme,
          style: {
            padding: '1rem',
            minHeight: '100vh'
          }
        },
        React.createElement(Story)
      );
    },
  ],
};

export default preview;
