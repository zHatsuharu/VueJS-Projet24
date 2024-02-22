import { createApp } from 'vue'
import App from './App.vue'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import router from './router'

const vuetify = createVuetify({
	components,
	directives,
	theme: {
		defaultTheme: 'dark'
	}
})

createApp(App).use(vuetify).use(router).mount('#app')
