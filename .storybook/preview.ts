import type { Preview } from '@storybook/react-vite';
import '../src/app/styles/global.css';
import '../src/app/styles/variables.css';
import '../src/app/styles/normalize.css';
import '../src/assets/fonts.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },

    a11y: {
      test: 'todo'
    }
  }
};

export default preview;
