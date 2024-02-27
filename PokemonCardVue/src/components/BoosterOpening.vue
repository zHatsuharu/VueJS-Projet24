<template>
  <VSheet class="ma-5 pa-5 cardContainer justify-center" v-if="data.length > 0">
      <div v-for="(card, index) in data" :key="generateKey(JSON.stringify(card), index)" class="card">
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

  function generateKey(cardStr: string, index: number): string {
    return cardStr + (Math.random() + index).toString(36).substring(2)
  }
</script>

<style scoped>
.cardContainer {
  display: flex;
  flex-flow: row wrap;
  gap: 15px;
  min-width: 65%;
}
.card {
  margin-top: 1rem;
  width: 192px;
  height: 266.25px;
  position: relative;
  border-radius: 0.25rem;
}
</style>
