import { configure } from '@storybook/react';

const storyFiles = require.context('../src', true, /.stories.js$/);

configure(() => {
    storyFiles.keys().forEach((filename) => storyFiles(filename));
}, module);