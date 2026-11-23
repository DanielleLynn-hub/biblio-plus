import BaseCard from './BaseCard.vue'

export default {
  title: 'Composants/BaseCard',
  component: BaseCard,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: 'Carte générique. Slots : `media` (en-tête visuel), contenu par défaut, `footer`.' } },
  },
}

export const ContenuSeul = {
  render: () => ({
    components: { BaseCard },
    template: '<div style="max-width: 18rem"><BaseCard><h3>Titre</h3><p>Contenu de la carte.</p></BaseCard></div>',
  }),
}

export const AvecMediaEtPied = {
  render: () => ({
    components: { BaseCard },
    template: `<div style="max-width: 18rem"><BaseCard>
      <template #media><img src="/covers/petit-prince.webp" alt="Couverture du Petit Prince" style="display:block;width:100%" /></template>
      <h3>Le Petit Prince</h3><p>Antoine de Saint-Exupéry</p>
      <template #footer><button type="button">Action</button></template>
    </BaseCard></div>`,
  }),
}
