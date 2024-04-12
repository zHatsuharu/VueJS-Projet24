<template>
	<VCard
		variant="tonal"
		class="ma-2"
		:loading="loading"
	>
		<VCardTitle>Cardmarket</VCardTitle>
		<VTable v-if="data">
			<thead>
				<tr>
					<th>
						Price Point
					</th>
					<th>
						Normal
					</th>
					<th v-if="hasHolo">
						Foil
					</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="[key, value] of Object.entries(CardmarketPriceTitle)"
					:key="key"
				>
					<td>
						{{ value }}
					</td>
					<td v-if="data.prices[key as keyof CardMarketPrices] != 0">
						{{ data.prices[key as keyof CardMarketPrices] }} €
					</td>
					<td v-else>
						-
					</td>
					<td v-if="hasHolo && data.prices[cardmarketNormaltoHoloKeys[key as keyof typeof cardmarketNormaltoHoloKeys] as keyof CardMarketPrices]">
						{{ data.prices[cardmarketNormaltoHoloKeys[key as keyof typeof cardmarketNormaltoHoloKeys] as keyof CardMarketPrices] }} €
					</td>
					<td v-else-if="hasHolo"></td>
				</tr>
			</tbody>
		</VTable>
    <VCardText v-else>No Data.</VCardText>
		<VCardActions
			v-if="data"
		>
			<VBtn
				prepend-icon="mdi-shopping"
				:href="data.url"
				target="blank"
				variant="tonal"
			>
				Buy
			</VBtn>
		</VCardActions>
	</VCard>
</template>

<script setup lang="ts">
import { Cardmarket } from '../types/cardmarket';
import { CardmarketPriceTitle } from '../constants/cardmarket.const'
import { cardmarketNormaltoHoloKeys } from '../constants/cardmarketNormaltoHolo.const';
import { CardMarketPrices } from '../types/cardmarketPrices';

	interface Props {
		loading: boolean
		data?: Cardmarket,
		hasHolo: boolean
	}
	const {loading, data, hasHolo} = defineProps<Props>()

</script>