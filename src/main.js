import { createApp, computed } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import { darkModeKey, styleKey } from '@/config.js'

import './css/main.css'

/* Fetch sample data
store.dispatch('fetchClients', 'clients') */
// store.dispatch('fetch', 'history')

/* App style */
store.dispatch('setStyle', localStorage[styleKey] ?? 'white')

/* Dark mode */
if ((!localStorage[darkModeKey] && window.matchMedia('(prefers-color-scheme: dark)').matches) || localStorage[darkModeKey] === '1') {
  store.dispatch('darkMode', true)
}

/* Default title tag */
const defaultDocumentTitle = 'SIM RT - BPS RI'

/* Collapse mobile aside menu on route change */
router.beforeEach(to => {
  store.dispatch('asideMobileToggle', false)
  store.dispatch('asideLgToggle', false)
})
router.beforeEach((to, from, next) => {
  const { authorize } = to.meta
  const currentUser = computed(() => store.state.auth.user)
  console.log(authorize)
  console.log(currentUser.value)

  if (authorize) {
    if (!currentUser.value) {
      // not logged in so redirect to login page with the return url
      return next({ path: '/login', query: { returnUrl: to.path } })
    }

    // check if route is restricted by role
    if (authorize.length && !currentUser.value.roles.includes(authorize)) {
      // role not authorised so redirect to home page
      return next({ path: '/' })
    }
  }

  next()
})

router.afterEach(to => {
  /* Set document title from route meta */
  if (to.meta && to.meta.title) {
    document.title = `${to.meta.title} — ${defaultDocumentTitle}`
  } else {
    document.title = defaultDocumentTitle
  }

  /* Full screen mode */
  store.dispatch('fullScreenToggle', !!to.meta.fullScreen)
})

createApp(App).use(store).use(router).mount('#app')
