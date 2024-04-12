<template>
  <VCard
      variant="tonal"
      max-width="600"
      :loading="loading"
  >
    <VCardTitle>{{ data?.name }}</VCardTitle>
    <VCardItem>
      <VImg
          :src="data?.images.logo"
          max-height="275"
      ></VImg>
    </VCardItem>
    <VCardActions>
      <VBtn
          :loading="loading || props.loadingBtn"
          prepend-icon="mdi-gift-open-outline"
          @click="emits('openPack')"
          :disabled="props.disabled"
      >Open</VBtn>
    </VCardActions>
  </VCard>
</template>

<script setup lang="ts">
  import {SetType} from "../types/set.ts";
  import {ref, watch} from "vue";

  interface Props {
    setId: string
    loadingBtn: boolean,
    disabled: boolean
  }
  const props = defineProps<Props>()

  type Emits = {
    openPack: []
  }
  const emits = defineEmits<Emits>()

  const data = ref<SetType>()
  const loading = ref(true)

  watch(() => props.setId, (newId) => {
    loading.value = true
    fetch(`https://api.pokemontcg.io/v2/sets/${newId}`, {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((result) => {
      data.value = result.data
    })
    .finally(() => {
      loading.value = false
    })
  }, {
    immediate: true
  })

</script>
