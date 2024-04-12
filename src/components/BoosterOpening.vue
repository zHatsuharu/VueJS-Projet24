<template>
  <AppCardContainer v-if="data.length > 0" v-show="cardsData.length > 0">
      <div v-for="(card, index) in cardsData" :key="generateKey(JSON.stringify(card), index)" class="card">
        <BoosterCardOpening
          :card="card"
        />
      </div>
  </AppCardContainer>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { BoosterCard } from "../types/boosterCard";
import AppCardContainer from "./AppCardContainer.vue";
import BoosterCardOpening from "./BoosterCardOpening.vue";
import { DropCard } from "../types/dropCard";
import { Card } from "../types/card";

  interface Props {
    data: BoosterCard[]
  }
  const {data} = defineProps<Props>()

  const cardsData = reactive<DropCard[]>([])

  function generateKey(cardStr: string, index: number): string {
    const randStr = () => (Math.random() + index).toString(36).substring(2)
    return randStr() + cardStr + randStr()
  }

  function luceneQuery(): string {
    const ids = data.map(el => 'id:'+el.id)
    return ids.join(' OR ')
  }

  fetch('https://api.pokemontcg.io/v2/cards?q=' + encodeURI(luceneQuery()))
  .then(response => response.json())
  .then(result => {
    data.forEach((boosterCard: BoosterCard) => {
      const card = result.data.filter((el: Card) => el.id === boosterCard.id)[0]
      cardsData.push({
        id: boosterCard.id,
        boosterCard,
        card
      })
    })
  })
</script>

<style scoped>
.card {
  margin-top: 1rem;
  width: 192px;
  height: 266.25px;
  position: relative;
  border-radius: 0.25rem;
}
</style>
