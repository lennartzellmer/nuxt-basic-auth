import { defineNuxtModule, addServerHandler, createResolver } from '@nuxt/kit'
import { defu } from 'defu'

export interface ModuleOptions {
  username?: string
  password?: string
  realm: string
  whitelistedRoutes: string[]
  enabled: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-basic-auth',
    configKey: 'basicAuth'
  },
  defaults: {
    username: process.env.BASIC_AUTH_USERNAME,
    password: process.env.BASIC_AUTH_PASSWORD,
    realm: process.env.BASIC_AUTH_REALM || 'default',
    whitelistedRoutes: [],
    enabled: true
  },
  setup (options, nuxt) {
    // Check if enabled
    if (!options.enabled) {
      return
    }
    // Check if config is present
    if (!options.username) {
      throw new Error('BasicAuth username not set. Either use runtimeConfig or \'.env\' with BASIC_AUTH_USERNAME')
    }
    if (!options.password) {
      throw new Error('BasicAuth password not set. Either use runtimeConfig or \'.env\' with BASIC_AUTH_PASSWORD')
    }

    // Copy module config in server runtimeConfig
    nuxt.options.runtimeConfig.basicAuth = defu(nuxt.options.runtimeConfig.basicAuth, options)

    // Transpile runtime
    const { resolve } = createResolver(import.meta.url)
    const runtimeDir = resolve('./runtime')
    nuxt.options.build.transpile.push(runtimeDir)

    addServerHandler({
      middleware: true,
      handler: resolve(runtimeDir, 'server/middleware/serverHandler')
    })
  }
})

declare module '@nuxt/schema' {
  interface RuntimeConfig
  {
    basicAuth: ModuleOptions
  }
}
