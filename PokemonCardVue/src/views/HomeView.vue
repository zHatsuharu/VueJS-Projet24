<template>
	<VContainer>
		<form>
			<SearchBar
				:disabled="loading"
				v-model="search"
				@keydown.enter.prevent="searchCard"
			/>
		</form>
		<AppCardContainer gap="30px">
			<template
				v-if="!loading && data !== undefined && data.data.length > 0"
				v-for="card in data.data"
				:key="JSON.stringify(card)"
			>
				<PokemonCard
					:card="card"
				/>
			</template>
			<template v-else-if="data && data.data.length <= 0">
				<AppSearchNotFound />
			</template>
			<template
				v-else
				v-for="_ in 24"
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
import { computed, ref } from 'vue';
import { CardList } from '../types/cardList'
import PokemonCard from '../components/PokemonCard.vue';
import { watch } from 'vue';
import AppCardContainer from '../components/AppCardContainer.vue';
import SearchBar from '../components/SearchBar.vue';
import AppSearchNotFound from '../components/AppSearchNotFound.vue';

	const loading = ref(true)
	const data = ref<CardList>()
	const page = ref(1);
	const length = ref(0)
	const search = ref('')

	const query = computed(() => 
		search.value !== '' ? `&q=name:"*${search.value}*"` : ''
	)

	function searchCard() {
		loading.value = true
		page.value = 1
		length.value = 0
		data.value = undefined
		fetch(`https://api.pokemontcg.io/v2/cards?pageSize=100&page=${page.value}${query.value}`, {
			method: 'GET'
		})
		.then(response => response.json())
		.then(result => {
			data.value = result
			if (data.value) {
				length.value = Math.ceil(data.value.totalCount / data.value.pageSize)
			}
		})
		.finally(() => {
			loading.value = false
		})
		.catch((error) => {
			console.error(error)
		})
	}

	watch(page, () => {
		loading.value = true
		data.value = undefined
		fetch(`https://api.pokemontcg.io/v2/cards?pageSize=100&page=${page.value}${query.value}`, {
			method: 'GET',
		})
		.then(response => response.json())
		.then(result => {
			data.value = result
			if (data.value) {
				length.value = Math.ceil(data.value.totalCount / data.value.pageSize)
			}
		})
		.finally(() => {
			loading.value = false
		})
		.catch((error) => {
			console.error(error)
		})
	},
	{
		immediate: true
	})
</script>