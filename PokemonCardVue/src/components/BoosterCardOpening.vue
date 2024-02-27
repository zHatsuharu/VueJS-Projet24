<template>
  <template v-if="data && !loading">
    <VCard
      :loading="loading"
      :class="{
        'cardFront': true,
        'flipped': flipped,
        'common': cardsRarity.common.includes(card.rarity),
        'uncommon': cardsRarity.uncommon.includes(card.rarity),
        'rare': cardsRarity.rare.includes(card.rarity),
        'special':cardsRarity.special.includes(card.rarity),
        'legendary': cardsRarity.legendary.includes(card.rarity),
      }"
      image="/backcard.png"
      @click="flipped = !loading"
    ></VCard>
    <VCard
      :class="{'cardBack': true, 'flipped': flipped}"
      :image="data.images.small"
      :href="'/card/' + card.id"
      target="_blank"
    ></VCard>
  </template>
  <template v-else>
    <VCard
      :loading="loading"
      width="192"
      height="266.25"
      image="/backcard.png"
    ></VCard>
  </template>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { BoosterCard } from '../types/boosterCard';
import { Card } from '../types/card';
import {cardsRarity} from "../constants/cardsRarity.const.ts";

	interface Props {
		card: BoosterCard
	}
	const {card} = defineProps<Props>()

	const flipped = ref(false)
  const loading = ref(true)
  const data = ref<Card>()

  fetch(`https://api.pokemontcg.io/v2/cards/${card.id}`, {
    method: 'GET'
  })
  .then(response => response.json())
  .then(result => {
    data.value = result.data
  })
  .finally(() => {
    loading.value = false
  })
</script>

<style scoped>
.cardFront,
.cardBack {
  position: absolute;
  width: 192px;
  height: 266.25px;
  transition: transform 0.5s ease,
              box-shadow 0.3s ease-in-out;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
.cardBack {
  transform: perspective(1000px) rotateY(180deg);
}

.cardBack.flipped {
  transform: perspective(1000px) rotateY(0deg);
}

.cardFront {
  transform: perspective(1000px) rotateY(0deg);
}

.cardFront.flipped {
  transform: perspective(1000px) rotateY(-180deg);
}

.common:hover {
  box-shadow: 0 0 20px 1px dimgrey;
}
.uncommon:hover {
  box-shadow: 0 0 20px 1px limegreen;
}
.rare:hover {
  box-shadow: 0 0 20px 1px dodgerblue;
}
.special:hover {
  box-shadow: 0 0 20px 1px mediumpurple;
}
.legendary:hover {
  box-shadow: 0 0 20px 2px gold;
}
</style>