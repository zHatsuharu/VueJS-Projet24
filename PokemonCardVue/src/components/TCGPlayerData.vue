<template>
	<VCard
		variant="tonal"
		class="ma-2"
		:loading="loading"
	>
		<VCardTitle>TCGPlayer</VCardTitle>
		<VTable v-if="data">
			<thead>
				<tr>
					<th>
						Price Point
					</th>
					<template v-for="priceType of Object.keys(availablePrices)">
						<th>
							{{ tcgplayerPriceName[priceType as keyof typeof tcgplayerPriceName] }}
						</th>
					</template>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="key in Object.keys(TCGPlayerPriceTitle)"
					:key="key"
				>
					<td>
						{{ TCGPlayerPriceTitle[key as PriceKeys] }}
					</td>
					<template v-for="prices of Object.keys(availablePrices)">
						<td>
							{{ availablePrices[prices][key as PriceKeys] }}
						</td>
					</template>
				</tr>
			</tbody>
		</VTable>
		<VCardText
			v-else
			v-if="!loading"
		>
			No data.
		</VCardText>
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
import { Tcgplayer } from '../types/tcgplayer';
import { TCGPlayerPriceTitle } from '../constants/tcgplayer.const'
import { tcgplayerPriceName } from '../constants/tcgplayerpricename.const'

	type PriceKeys = keyof typeof TCGPlayerPriceTitle;

	interface Props {
		loading: boolean
		data?: Tcgplayer
		availablePrices: any
	}
	const {loading, data, availablePrices} = defineProps<Props>()

</script>
