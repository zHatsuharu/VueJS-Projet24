<template>
	<VContainer>
    <VSheet :elevation="3" class="ma-5">
      <VRow
          class="d-flex align-center"
      >
        <VCol>
          <TCGPlayerData
              :loading="loading"
              :data="data?.tcgplayer"
              :available-prices="availablePrices"
          />
        </VCol>
        <VCol>
          <VImg
              :src="data?.images.small"
              width="229.9"
              height="325.45"
              class="mx-auto"
          />
        </VCol>
        <VCol>
          <CardmarketData
              :loading="loading"
              :data="data?.cardmarket"
              :has-holo="hasHolo"
          />
        </VCol>
      </VRow>
    </VSheet>
	</VContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Card } from '../types/card';
import { useRoute } from 'vue-router';
import TCGPlayerData from '../components/TCGPlayerData.vue';
import { computed } from 'vue';
import { tcgplayerPriceTypes } from '../constants/tcgplayerpricetypes.const';
import { TcgplayerPrices } from '../types/tcgplayerPrices';
import CardmarketData from '../components/CardmarketData.vue';
import { cardmarketHoloKeys } from '../constants/cardmarketHoloKeys.const';

	const route = useRoute()

	const loading = ref(true)
	const data = ref<Card>()
	const cardId = route.params.cardId

	fetch(`https://api.pokemontcg.io/v2/cards/${cardId}`, {
		method: 'GET'
	})
	.then(response => response.json())
	.then(result => {
		data.value = result.data
	})
	.finally(() => {
		loading.value = false
	})

	const availablePrices = computed(() => {
		const result: any = {}
		if (data.value?.tcgplayer) {
			for(const priceType of tcgplayerPriceTypes) {
				if (data.value.tcgplayer.prices[priceType as keyof TcgplayerPrices]) {
					result[priceType] = data.value.tcgplayer.prices[priceType as keyof TcgplayerPrices]
				}
			}
		}
		return JSON.parse(JSON.stringify(result))
	})

	const hasHolo = computed(() => {
		if (data.value?.cardmarket) {
			for (const [key, value] of Object.entries(data.value.cardmarket.prices)) {
				if (cardmarketHoloKeys.includes(key)) {
					if (value != 0) return true
				}
			}
		}
		return false
	})

</script>
