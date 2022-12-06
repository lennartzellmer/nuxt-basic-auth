import { defineEventHandler } from 'h3'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler((event) => {
  const {
    username,
    password,
    realm,
    whitelistedRoutes
  } = useRuntimeConfig().basicAuth

  // Allow access on whitelisted routes
  if (whitelistedRoutes.includes(event.node.req.url || '')) {
    return
  }

  // Check authentication
  let authenticated = false
  const base64Credentials = event.node.req.headers?.authorization?.split(' ')?.[1]
  if (base64Credentials) {
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii')
    const [credentialsUsername, credentialsPassword] = credentials.split(':')
    authenticated = credentialsUsername === username && credentialsPassword === password
  }

  // Reject authentication
  if (!authenticated) {
    event.node.res.statusCode = 401
    event.node.res.setHeader('WWW-Authenticate', `Basic realm="${realm}"`)
    event.node.res.end('Unauthorized')
  }
})
