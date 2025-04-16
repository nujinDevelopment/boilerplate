import { useLogger, useRequestEvent, useSupabaseUser } from '#imports'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const logger = useLogger()
  const event = useRequestEvent()
  const user = useSupabaseUser()
  const method = event?.method || 'unknown'

  // Log request details
  await logger.log(
    `${method} ${to.fullPath}`,
    'info',
    'request',
    {
      method,
      url: to.fullPath,
      params: to.params,
      query: to.query,
      userId: user.value?.id,
      userRole: user.value?.user_metadata?.role
    }
  )

  // Log request body for non-GET requests
  if (method !== 'GET' && to.meta.body) {
    try {
      const body = JSON.parse(to.meta.body as string)
      await logger.log(
        'Request body',
        'debug',
        'request',
        body
      )
    } catch (error: unknown) {
      await logger.log(
        `Failed to parse request body: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'warn',
        'request'
      )
    }
  }

  // Log response after navigation
  const logResponse = async () => {
    const status = to.meta.statusCode || to.meta.statusMessage || 'unknown'
    await logger.log(
      `Response ${status}`,
      'info',
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
