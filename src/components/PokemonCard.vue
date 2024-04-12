<template>
	<VLazy
		transition="fade-transition"
	>
		<VCard
			width="180px"
		>
			<VImg
				width="180px"
				height="250px"
				:src="card.images.small"
			/>
			<VCardTitle>
				{{ card.name }}
			</VCardTitle>
			<VChip :prepend-icon="tcgicon" :color="tcgcolor">TCGPlayer</VChip>
			<VChip :prepend-icon="cmarketicon" :color="cmarketcolor">Cardmarket</VChip>
			<VBtn
				icon="mdi-arrow-right-thick"
				:to="`/card/${card.id}`"
			/>
		</VCard>
	</VLazy>
</template>

<script setup lang="ts">
import { Card } from '../types/card';
import {computed} from "vue";

	interface Props {
		card: Card
	}

	const {card} = defineProps<Props>()

	const tcgicon = computed(() => {
		return card.tcgplayer ? 'mdi-check' : 'mdi-close'
	})
	const cmarketicon = computed(() => {
		return card.cardmarket ? 'mdi-check' : 'mdi-close'
	})
	const tcgcolor = computed(() => {
		return card.tcgplayer ? 'green' : 'red'
	})
	const cmarketcolor = computed(() => {
		return card.cardmarket ? 'green' : 'red'
	})
</script>
