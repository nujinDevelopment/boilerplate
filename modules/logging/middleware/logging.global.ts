import { defineNuxtRouteMiddleware, useLogger, useRequestHeaders } from '#imports'
import { v4 as uuidv4 } from 'uuid'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const logger = useLogger()
  const headers = useRequestHeaders()
  const method = headers['x-http-method'] || 'unknown'
  const requestId = uuidv4()

  logger.setMetadata('requestId', requestId)
  
  const authUser = headers['x-auth-user']
  const userId = authUser ? JSON.parse(authUser).userId : null
  const userRoles = authUser ? JSON.parse(authUser).roles : []

  // Log request details
  logger.info(
    `[${requestId}] ${method} ${to.fullPath}`,
    'request',
    {
      method,
      url: to.fullPath,
      params: to.params,
      query: to.query,
      userId,
      userRoles,
      headers
    }
  )

  // Log request body for non-GET requests  
  if (method !== 'GET') {
    // Attempt to parse request body from to.meta.body
    let body = null
    try {
      body = JSON.parse(to.meta.body || '{}')
    } catch (e) {
      // Ignore parse errors and just log empty body
      logger.warn(
        `[${requestId}] Failed to parse request body: ${e.message}`, 
        'request',
        { error: e }
      )
    }
    
    logger.debug(
      `[${requestId}] Request body`, 
      'request',
      body
    )
  }

  // Log response after navigation
  const logResponse = () => {
    const status = to.meta.statusCode || to.meta.statusMessage || null

    logger.info(
      `[${requestId}] Response ${status}`,
      'response', 
      {
        status,
        url: to.fullPath
      }
    )
  }
  
  // Hook to log response after sending to client
  to.meta.pageTransitionCallback = logResponse
})