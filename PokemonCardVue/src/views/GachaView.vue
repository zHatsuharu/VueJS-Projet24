<template>
	<VContainer class="d-flex align-center justify-center flex-column">
    <VCard
        min-width="400"
    >
      <VSelect
          :loading="loading"
          label="Select a Set"
          :items="data"
          :item-title="formatTitle"
          :item-value="(item: SetGacha) => item"
          v-model="selected"
      ></VSelect>
      <SetInfoGacha
          v-if="selected"
          :set-id="selected.code"
          :loading-btn="loadingBtn"
          @open-pack="openPack"
      />
    </VCard>
    <BoosterOpening
        v-if="boosterData"
        :data="boosterData"
    />
  </VContainer>
</template>

<script setup lang="ts">

import {ref} from "vue";
  import {SetGacha} from "../types/setGacha.ts";
  import SetInfoGacha from "../components/SetInfoGacha.vue";
import {BoosterCard} from "../types/boosterCard.ts";
import BoosterOpening from "../components/BoosterOpening.vue";

  const loading = ref(true)
  const loadingBtn = ref(false)
  const data = ref<SetGacha[]>([])
  const boosterData = ref<BoosterCard[]>()
  const selected = ref<SetGacha>()

  function formatTitle(item: SetGacha) {
    return `${item.name} - ${item.series}`
  }

  fetch('/api/pack-sim/searchPacks.php', {
    method: 'GET',
  })
  .then((response) => response.json())
  .then((result) => {
    data.value = result
  })
  .finally(() => {
    loading.value = false
  })

  function openPack() {
    if (selected.value) {
      let setName = selected.value.name.replace(" (European)", "").replace(" (OCG)", "");
      let server = 'origin'
      let url = `/api/pack-sim/pack-open.php?format=${encodeURIComponent(setName)}&server=${server}`;
      const setType = selected.value.code;
      if (setType == '500' || setType == '501' || setType == '502') {
        url += `&settype=${setType}`;
      } else {
        url += `&settype=2`;
      }
      loadingBtn.value = true
      fetch(url, {
        method: 'GET',
      })
      .then((response) => response.json())
      .then((result) => {
        boosterData.value = result
      })
      .finally(() => {
        loadingBtn.value = false
      })
    }
  }

</script>
