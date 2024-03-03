<template>
	<VTextField
		prepend-inner-icon="mdi-magnify"
		v-model="search"
		placeholder="Search for a card"
		clearable
	></VTextField>
</template>

<script setup lang="ts">
	const search = defineModel()
</script>
