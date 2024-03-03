<template>
	<VContainer class="d-flex align-center justify-center flex-column">
    <VCard
        min-width="400"
    >
      <VAutocomplete
          :loading="loading"
          label="Select a Set"
          :items="data"
          :item-title="formatTitle"
          :item-value="(item: SetGacha) => item"
          v-model="selected"
      ></VAutocomplete>
      <SetInfoGacha
          v-if="selected"
          :set-id="selected.code"
          :loading-btn="loadingBtn"
          :disabled="errorMsg !== ''"
          @open-pack="openPack"
      />
    </VCard>
    <BoosterOpening
      v-if="boosterData.length > 0"
      :data="boosterData"
      :key="openingKey"
    />
    <VAlert
      v-if="errorMsg !== ''"
      :text="errorMsg"
      color="red"
      class="ma-5"
    >
    </VAlert>
  </VContainer>
</template>

<script setup lang="ts">

import {reactive, ref, watch} from "vue";
import {SetGacha} from "../types/setGacha.ts";
import SetInfoGacha from "../components/SetInfoGacha.vue";
import {BoosterCard} from "../types/boosterCard.ts";
import BoosterOpening from "../components/BoosterOpening.vue";

  const loading = ref(true)
  const loadingBtn = ref(false)
  const data = reactive<SetGacha[]>([])
  const boosterData = reactive<BoosterCard[]>([])
  const selected = ref<SetGacha>()
  const openingKey = ref(0)
  const errorMsg = ref('')

  function formatTitle(item: SetGacha) {
    return `${item.name} - ${item.series}`
  }

  fetch('/api/pack-sim/searchPacks.php', {
    method: 'GET',
  })
  .then((response) => response.json())
  .then((result) => {
    data.splice(0, data.length)
    data.push(...result)
  })
  .finally(() => {
    loading.value = false
  })

  function openPack() {
    boosterData.splice(0, boosterData.length)
    if (selected.value) {
      openingKey.value++
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
        boosterData.push(...result)
      })
      .finally(() => {
        loadingBtn.value = false
      })
      .catch(error => {
        console.error(error)
        errorMsg.value = 'An error occured... The booster may be unavailable anymore.'
      })
    }
  }

  watch(selected, () => {
    errorMsg.value = ''
  })

</script>
