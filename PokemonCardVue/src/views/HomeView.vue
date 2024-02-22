<template>
	<VContainer>
		<VRow>
			<VCol
				v-if="!loading && data !== undefined"
				v-for="card in data.data"
				:key="JSON.stringify(card)"
			>
				<PokemonCard
					:card="card"
				/>
			</VCol>
			<VCol
				v-else
				v-for="n in 24"
				:key="n"
			>
				<VSkeletonLoader
					type="card"
					elevation="1"
					width="180px"
				></VSkeletonLoader>
			</VCol>
		</VRow>
	</VContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { CardList } from '../types/cardList'
import PokemonCard from '../components/PokemonCard.vue';

	const loading = ref(true)
	const data = ref<CardList>()

	fetch('https://api.pokemontcg.io/v2/cards?pageSize=100', {
		method: 'GET',

	}).then(response => response.json())
	.then(result => {
		data.value = result
		loading.value = false
	})

</script>