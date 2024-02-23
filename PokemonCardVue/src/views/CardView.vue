<template>
	<VContainer>
		<VSheet
			:elevation="3"
			class="d-flex flex-row"
		>
			<TCGPlayerData
				:loading="loading"
				:data="data?.tcgplayer"
				:available-prices="availablePrices"
			/>
			<VImg
				:src="data?.images.small"
				width="229.9"
				height="325.45"
			/>
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
		if (data.value) {
			for(const priceType of tcgplayerPriceTypes) {
				if (data.value.tcgplayer.prices[priceType as keyof TcgplayerPrices]) {
					result[priceType] = data.value.tcgplayer.prices[priceType as keyof TcgplayerPrices]
				}
			}
		}
		return JSON.parse(JSON.stringify(result))
	})

</script>
