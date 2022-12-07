import { defineNuxtConfig } from 'nuxt/config'
import MyModule from '..'

export default defineNuxtConfig({
  modules: [MyModule],
  basicAuth: {
    password: 'password',
    username: 'username',
    realm: 'defaultRealm',
    whitelistedRoutes: ['/health'],
    enabled: false
  }
})
