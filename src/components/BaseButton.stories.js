import BaseButton from './BaseButton.vue'

export default {
  title: 'Composants/BaseButton',
  component: BaseButton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'ghost'] },
    to: { control: 'text', description: 'Si renseignée, le composant devient un lien interne (RouterLink)' },
  },
  render: (args) => ({
    components: { BaseButton },
    setup: () => ({ args }),
    template: '<BaseButton v-bind="args">Parcourir le catalogue</BaseButton>',
  }),
}

export const Primary = { args: { variant: 'primary' } }
export const Ghost = { args: { variant: 'ghost' } }
export const CommeLien = { args: { variant: 'primary', to: '/' } }
