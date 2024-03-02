<template>
	<VContainer>
		<AppCardContainer gap="30px">
			<template
				v-if="!loading && data !== undefined"
				v-for="card in data.data"
				:key="JSON.stringify(card)"
			>
				<PokemonCard
					:card="card"
				/>
			</template>
			<template
				v-else
				v-for="n in 24"
				:key="n"
			>
				<VSkeletonLoader
					type="card"
					elevation="1"
					width="180px"
				></VSkeletonLoader>
			</template>
		</AppCardContainer>
		<VPagination
			v-if="length > 0"
			:disabled="loading"
			:length="length"
			v-model="page"
			rounded="circle"
		/>
	</VContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { CardList } from '../types/cardList'
import PokemonCard from '../components/PokemonCard.vue';
import { watch } from 'vue';
import AppCardContainer from '../components/AppCardContainer.vue';

	const loading = ref(true)
	const data = ref<CardList>()
	const page = ref(1);
	const length = ref(0)

	watch(page, () => {
		loading.value = true
		fetch(`https://api.pokemontcg.io/v2/cards?pageSize=100&page=${page.value}`, {
			method: 'GET',
		})
		.then(response => response.json())
		.then(result => {
			data.value = result
			loading.value = false
			if (data.value) {
				length.value = Math.ceil(data.value.totalCount / data.value.pageSize)
			}
		})
		.catch((error) => {
			console.error(error)
		})
	},
	{
		immediate: true
	})
</script>