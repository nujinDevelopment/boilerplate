import { defineNuxtRouteMiddleware, useLogger } from '#imports'

export default defineNuxtRouteMiddleware((to, from) => {
  const logger = useLogger()
  
  logger.info(
    `Route changed from "${from.fullPath}" to "${to.fullPath}"`,
    'navigation',
    {
      from: from.fullPath,
      to: to.fullPath,
      params: to.params,
      query: to.query
    }
  )
})