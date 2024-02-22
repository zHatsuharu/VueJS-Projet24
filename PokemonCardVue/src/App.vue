<script setup lang="ts">
  import {RouterView} from 'vue-router'

  const links = [
    {name: 'Home', link: '/'},
    {name: 'Gacha', link: '/gacha'}
  ]
</script>

<template>
  <VLayout>
    <VAppBar>
      <VContainer>
        <VBtn v-for="link in links" :key="JSON.stringify(link)" :to="link.link" class="mx-2">
          {{ link.name }}
        </VBtn>
      </VContainer>
    </VAppBar>

    <VMain>
      <RouterView />
    </VMain>
  </VLayout>
</template>
