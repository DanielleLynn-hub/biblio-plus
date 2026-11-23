<script setup>
import { reactive, computed, ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'

const form = reactive({ name: '', email: '', message: '' })
const touched = reactive({ name: false, email: false, message: false })
const sent = ref(false)

const errors = computed(() => ({
  name: form.name.trim().length < 2 ? 'Votre nom est requis.' : '',
  email: /^\S+@\S+\.\S+$/.test(form.email) ? '' : 'Adresse e-mail invalide.',
  message: form.message.trim().length < 10 ? '10 caractères minimum.' : '',
}))
const isValid = computed(() => Object.values(errors.value).every((e) => !e))

function submit() {
  Object.keys(touched).forEach((k) => (touched[k] = true))
  if (!isValid.value) return
  sent.value = true // simulation : aucun back-end dans ce projet
}
</script>

<template>
  <div class="page">
    <h1>Contact</h1>
    <p v-if="sent" role="status">Merci, votre message a bien été envoyé.</p>
    <form v-else novalidate @submit.prevent="submit">
      <div class="field">
        <label for="name">Nom</label>
        <input id="name" v-model="form.name" autocomplete="name" @blur="touched.name = true"
          :aria-invalid="touched.name && !!errors.name"
          :aria-describedby="touched.name && errors.name ? 'name-err' : undefined" />
        <p v-if="touched.name && errors.name" id="name-err" class="field__error">{{ errors.name }}</p>
      </div>
      <div class="field">
        <label for="email">Adresse e-mail</label>
        <input id="email" v-model="form.email" type="email" autocomplete="email"
          @blur="touched.email = true" :aria-invalid="touched.email && !!errors.email"
          :aria-describedby="touched.email && errors.email ? 'email-err' : undefined" />
        <p v-if="touched.email && errors.email" id="email-err" class="field__error">{{ errors.email }}</p>
      </div>
      <div class="field">
        <label for="message">Message</label>
        <textarea id="message" v-model="form.message" rows="5" @blur="touched.message = true"
          :aria-invalid="touched.message && !!errors.message"
          :aria-describedby="touched.message && errors.message ? 'message-err' : undefined"></textarea>
        <p v-if="touched.message && errors.message" id="message-err" class="field__error">
          {{ errors.message }}
        </p>
      </div>
      <BaseButton type="submit">Envoyer</BaseButton>
    </form>
  </div>
</template>
