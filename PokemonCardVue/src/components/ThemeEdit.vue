<template>
	<VBtn
		:icon="icon"
		@click="$emit('changeTheme')"
	></VBtn>
</template>

<script setup lang="ts">
interface Props {
	icon?: string
}
const { icon } = defineProps<Props>()

type Emits = {
	'changeTheme': []
}
const emit = defineEmits<Emits>()
</script>
