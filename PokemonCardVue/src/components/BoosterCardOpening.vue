<template>
  <VCard
    :class="{
      'cardFront': true,
      'flipped': flipped,
      'common': cardsRarity.common.includes(card.card.rarity),
      'uncommon': cardsRarity.uncommon.includes(card.card.rarity),
      'rare': cardsRarity.rare.includes(card.card.rarity),
      'special':cardsRarity.special.includes(card.card.rarity),
      'legendary': cardsRarity.legendary.includes(card.card.rarity),
    }"
    image="/backcard.png"
    @click="flipped = !flipped"
  ></VCard>
  <VCard
    :class="{'cardBack': true, 'flipped': flipped}"
    :image="card.card.images.small"
    :href="'/card/' + card.id"
    target="_blank"
  ></VCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Card } from '../types/card';
import {cardsRarity} from "../constants/cardsRarity.const.ts";
import { DropCard } from '../types/dropCard.ts';

	interface Props {
		card: DropCard
	}
	const {card} = defineProps<Props>()

	const flipped = ref(false)
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