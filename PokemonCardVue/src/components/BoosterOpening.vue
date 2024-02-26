<template>
  <VSheet class="ma-5 pa-5 cardContainer" v-if="data.length > 0">
      <div v-for="card in data" :key="JSON.stringify(card)" class="card">
        <BoosterCardOpening
          :card="card"
        />
      </div>
  </VSheet>
</template>

<script setup lang="ts">
import { BoosterCard } from "../types/boosterCard";
import BoosterCardOpening from "./BoosterCardOpening.vue";

  interface Props {
    data: BoosterCard[]
  }
  const {data} = defineProps<Props>()
</script>

<style scoped>
.cardContainer {
  display: flex;
  flex-flow: row wrap;
  gap: 15px;
}
.card {
  margin-top: 1rem;
  width: 192px;
  height: 266.25px;
  position: relative;
  border-radius: 0.25rem;
}
</style>
