# Nuxt 3 - Basic Auth Module

This module provides basic auth for nuxt 3.

## Installation

```
npm install -D @zellart/nuxt-basic-auth
```

## Required option configuration

You need to set username / password to be able to use basic auth:

```nuxt.config.ts
import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: [
    ['basic-auth', { 
      username: 'username', 
      password: 'password' 
    }]
  ],
})
```

## Module Options

### enabled 
Type: `boolean`
Default: `true`

If set to `false`, skip authentication.
You might want to use that in comination with .env variables.

```nuxt.config.ts
import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: [
    ['basic-auth', { 
      username: 'username', 
      password: 'password',
      enabled: process.env.IS_PROD !== '1'
    }]
  ],
})
```

### whitelistedRoutes 
Type: `string[]`
Default: `[]`

Sometimes routes need to be accessible regradless of basic auth setting. One example would be health check routes that rely on a `200` response.

```nuxt.config.ts
import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: [
    ['basic-auth', { 
      username: 'username', 
      password: 'password',
      whitelistedRoutes: ['/api/health']
    }]
  ],
})
```

### realm 
Type: `string`
Default: `default`

In rare cases you might need to set the realm in order to group basic auth together.

```nuxt.config.ts
import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: [
    ['basic-auth', { 
      username: 'username', 
      password: 'password',
      realm: 'myAwesomeRealm'
    }]
  ],
})
```

## Optional: You can set basic options directly via .env variables.

You can also use .env variables for the following Options. Just set them in your .env file / enviroment without the need to configure them in your nuxt config.

- BASIC_AUTH_USERNAME
- BASIC_AUTH_PASSWORD
- BASIC_AUTH_REALM

---

## Why is this module needed?
There are some alternatives to this module you might want to consider.

### Nuxt 2 Basic auth
There is already a good solution for nuxt 2 but it is not compatible with nuxt 3.
➔ [Nuxt 2 Module](https://github.com/potato4d/nuxt-basic-auth-module)

### Other nuxt 3 basic auth modules
➔ [nuxt-basic-authentication-module](https://github.com/monsat/nuxt-basic-auth-module)

This module offers nearly the same functionality. Is uses a third party library ('basic-auth') to abstract the basic auth handling and misses the option to whitelist routes. The configuration is done on runtimeConfig and uses and uses a notation that needs getting used to.
If you need to set production domains that are excluded from the basic auth this is the way to go.

➔ [nuxt-basic-auth](https://github.com/xtranophilist/nuxt-basic-auth)

This module offers the basic auth feature. Is uses a third party library ('basic-auth') to abstract the basic auth handling and lacks the option to whitelist routes. It uses nitro hooks to inject the handler which is quite bare bone.
Nuxt however suggests to use the addServerHandler() function for injecting middlewares.

### Just using a plain server middleware
If you want, you can provide the same functionality with a custom server middleware.

1. Just create a file under /server/middleware/basicAuth.ts
2. Copy and paste contents of this file: https://github.com/lennartzellmer/nuxt-basic-auth/blob/main/src/runtime/server/middleware/serverHandler.ts

```
basicAuth: {
    password: 'password',
    username: 'username',
    realm: 'defaultRealm',
    whitelistedRoutes: []
  }
```

3. Depending on your usecase you migth want to implement a custom disable / enable logic



## Development

This module uses the 

- Run `npm run dev:prepare` to generate type stubs.
- Use `npm run dev` to start [playground](./playground) in development mode.