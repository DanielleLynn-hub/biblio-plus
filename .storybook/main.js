/** @type {import('@storybook/vue3-vite').StorybookConfig} */
export default {
  stories: ['../src/**/*.stories.js'],
  addons: ['@storybook/addon-docs'],
  framework: '@storybook/vue3-vite',
  staticDirs: ['../public'], // couvertures : /covers/...
}
