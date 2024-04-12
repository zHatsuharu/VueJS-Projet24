<template>
	<VSheet class="ma-5 pa-5 cardContainer justify-center" :style="{gap}">
		<slot></slot>
	</VSheet>
</template>

<script setup lang="ts">
	interface Props {
		gap?: string
	}
	const {gap = '15px'} = defineProps<Props>()
</script>

<style scoped>
.cardContainer {
  display: flex;
  flex-flow: row wrap;
  gap: 15px;
  min-width: 65%;
}
</style>