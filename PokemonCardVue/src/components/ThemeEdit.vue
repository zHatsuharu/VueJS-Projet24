<template>
	<VSwitch
		true-icon="mdi-weather-night"
		false-icon="mdi-weather-sunny"
		v-model="darkMode"
		@change="$emit('changeTheme')"
	>
	</VSwitch>
</template>

<script setup lang="ts">
const darkMode = defineModel({
	default: true,
	type: Boolean
})

type Emits = {
	'changeTheme': []
}
const emit = defineEmits<Emits>()
</script>
