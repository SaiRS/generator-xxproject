import { configure, addParameters } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

addParameters({ viewport: { viewports: { ...INITIAL_VIEWPORTS } } });

// automatically import all files ending in *.stories.tsx
const req = require.context('../stories', true, /\.stories\.tsx?$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
