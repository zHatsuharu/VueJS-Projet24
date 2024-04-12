<script setup lang="ts">
import {RouterView} from 'vue-router'
import ThemeEdit from './components/ThemeEdit.vue';
import { useTheme } from 'vuetify';
import { computed, ref } from 'vue';

  const links = [
    {
      name: 'Home',
      link: '/',
      icon: 'mdi-home-outline'
    },
    {
      name: 'Gacha',
      link: '/gacha',
      icon: 'mdi-treasure-chest-outline'
    }
  ]

  const theme = useTheme()
  const darkMode = ref(true)

  const toggleTheme = () => {
    darkMode.value = !darkMode.value
    theme.global.name.value = darkMode.value ? "dark" : "light"
  }
  
  const icon = computed(() => darkMode.value ? 'mdi-weather-night' : 'mdi-weather-sunny')
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
          <VTab
            v-for="link in links"
            :key="JSON.stringify(link)"
            :to="link.link"
            :prepend-icon="link.icon"
          >
            {{ link.name }}
          </VTab>
        </VTabs>
      </template>
      <template #append>
        <ThemeEdit
          :icon="icon"
          @change-theme="toggleTheme"
        />
      </template>
    </VAppBar>

    <VMain>
      <RouterView />
    </VMain>
  </VLayout>
</template>
