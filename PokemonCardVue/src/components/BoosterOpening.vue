<template>
  <VSheet>
    <template>
      <VCard
          link
          :class="{'cardFront': true, 'flipped': flipped}"
          min-width="192"
          min-height="266.25"
          image="/backcard.png"
          @click="flipped = !flipped"
      >
      </VCard>
      <VCard
          :class="{'cardBack': true, 'flipped': flipped}"
          image=""
      ></VCard>
    </template>
  </VSheet>
</template>

<script setup lang="ts">
  import {BoosterCard} from "../types/boosterCard.ts";
  import {ref} from "vue";

  interface Props {
    data: BoosterCard[]
  }
  const {data} = defineProps<Props>()

  const flipped = ref(false)
</script>

<style scoped>
.cardFront,
.cardBack {
  transition: transform 0.5s ease;
  position:absolute;
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
