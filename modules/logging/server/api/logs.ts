import { createRouter, defineEventHandler, useBody } from 'h3'
import { z } from 'zod'
import { prisma } from '@/server/database/client'
import { useLogger } from '@/modules/logging/composables/useLogger'

const router = createRouter()
const logger = useLogger()

const LogInputSchema = z.object({
  message: z.string().min(1),
  level: z.enum(['info', 'warn', 'error', 'debug']),
  category: z.string().min(1),
  metadata: z.record(z.unknown()).optional()
})

router.post('/', async (event) => {
  try {
    logger.info('Incoming POST request to /api/logs', 'api/logs')
    
    const body = await useBody(event)
    const result = LogInputSchema.safeParse(body)

    if (!result.success) {
      const issues = JSON.stringify(result.error.issues) 
      logger.warn(`Invalid log input: ${issues}`, 'api/logs/validation')
      throw new Error('Invalid log input')
    }
    
    logger.debug('Log input passed validation', 'api/logs/validation')

    const log = await prisma.log.create({
      data: {
        message: result.data.message,
        level: result.data.level, 
        category: result.data.category,
        metadata: result.data.metadata || {},
      }
    })

    logger.info(`Log created successfully: ${log.id}`, 'api/logs/create', { log })

    return log
  } catch (err) {
    logger.error(`Error in POST /api/logs: ${err}`, 'api/logs/error', { error: err }) 
    throw err
  }
})

// API handler for fetching logs with pagination and filtering
router.get('/', async (event) => {
  try {
    logger.info('Incoming GET request to /api/logs', 'api/logs')

    const query = useQuery(event)

    const page = parseInt(query.page as string) || 1
    const pageSize = parseInt(query.pageSize as string) || 10
    const level = query.level as string 
    const category = query.category as string

    const where: any = {}
    if (level) where.level = level
    if (category) where.category = category

    logger.debug(`Fetching logs with filters: ${JSON.stringify(where)}`, 'api/logs/fetch')

    const totalCount = await prisma.log.count({ where })
  
    const logs = await prisma.log.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,  
    })
  
    const response = {
      logs, 
      totalCount,
      page, 
      pageSize
    }

    logger.info(`Fetched ${logs.length} logs, total count: ${totalCount}`, 'api/logs/fetch', response)

    return response
  } catch (err) {
    logger.error(`Error in GET /api/logs: ${err}`, 'api/logs/error', { error: err })
    throw err
  }
})

export default defineEventHandler((event) => {
  return router.handler(event)  
})