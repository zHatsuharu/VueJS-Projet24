<script setup lang="ts">
import {RouterView} from 'vue-router'
import ThemeEdit from './components/ThemeEdit.vue';
import { useTheme } from 'vuetify';
import { ref } from 'vue';

  const links = [
    {name: 'Home', link: '/'},
    {name: 'Gacha', link: '/gacha'}
  ]

  const theme = useTheme()
  const darkMode = ref(true)

  const toggleTheme = () => {
    theme.global.name.value = darkMode.value ? "dark" : "light"
  }
</script>

<template>
  <VLayout>
    <VAppBar>
      <template #prepend>
        <VImg src="/icon.png" width="44" height="44" />
      </template>
      <template #title>
        PokeCard
      </template>
      <template #extension>
        <VTabs class="mx-auto">
          <VTab v-for="link in links" :key="JSON.stringify(link)" :to="link.link">
            {{ link.name }}
          </VTab>
        </VTabs>
      </template>
      <template #append>
        <ThemeEdit v-model="darkMode" @change-theme="toggleTheme" />
      </template>
    </VAppBar>

    <VMain>
      <RouterView />
    </VMain>
  </VLayout>
</template>
