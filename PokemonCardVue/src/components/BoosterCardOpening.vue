<template>
  <template v-if="data && !loading">
    <VCard
      :loading="loading"
      :class="{'cardFront': true, 'flipped': flipped}"
      image="/backcard.png"
      @click="flipped = !loading"
    ></VCard>
    <VCard
      :class="{'cardBack': true, 'flipped': flipped}"
      :image="data.images.small"
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
  transition: transform 0.5s ease;
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
</style>