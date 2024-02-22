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
			<VChip prepend-icon="mdi-check">TCGPlayer</VChip>
			<VChip prepend-icon="mdi-check">Cardmarket</VChip>
			<VBtn
				icon="mdi-arrow-right-thick"
				:to="`/card/${card.id}`"
			/>
		</VCard>
	</VLazy>
</template>

<script setup lang="ts">
import { Card } from '../types/card';

	interface Props {
		card: Card
	}

	const {card} = defineProps<Props>()
</script>
