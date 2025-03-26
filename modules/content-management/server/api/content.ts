import { defineEventHandler, createError } from 'h3'
import { getServerSession } from '#auth'
import { prisma } from '~/server/database'
import type { Content, CreateContentDTO, UpdateContentDTO } from '../../types'

// Get all content
export const GET = defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  if (!session) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  try {
    const contents = await prisma.content.findMany({
      orderBy: {
        updatedAt: 'desc'
      }
    })
    return contents
  } catch (error) {
    console.error('Failed to fetch contents:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch contents'
    })
  }
})

// Get single content by ID
export const getContentById = defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  if (!session) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  const id = event.context.params?.id
  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'Content ID is required'
    })
  }

  try {
    const content = await prisma.content.findUnique({
      where: { id }
    })

    if (!content) {
      throw createError({
        statusCode: 404,
        message: 'Content not found'
      })
    }

    return content
  } catch (error) {
    console.error('Failed to fetch content:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch content'
    })
  }
})

// Create new content
export const POST = defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  if (!session) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  const body = await readBody<CreateContentDTO>(event)
  if (!body.title || !body.type || !body.content) {
    throw createError({
      statusCode: 400,
      message: 'Missing required fields'
    })
  }

  try {
    const content = await prisma.content.create({
      data: {
        title: body.title,
        type: body.type,
        content: body.content,
        metadata: body.metadata || {},
        status: 'draft',
        createdBy: session.user.id
      }
    })
    return content
  } catch (error) {
    console.error('Failed to create content:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to create content'
    })
  }
})

// Update content
export const PUT = defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  if (!session) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  const id = event.context.params?.id
  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'Content ID is required'
    })
  }

  const body = await readBody<UpdateContentDTO>(event)
  if (Object.keys(body).length === 0) {
    throw createError({
      statusCode: 400,
      message: 'No update data provided'
    })
  }

  try {
    const content = await prisma.content.update({
      where: { id },
      data: {
        ...body,
        updatedAt: new Date()
      }
    })
    return content
  } catch (error) {
    console.error('Failed to update content:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to update content'
    })
  }
})

// Delete content
export const DELETE = defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  if (!session) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  const id = event.context.params?.id
  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'Content ID is required'
    })
  }

  try {
    await prisma.content.delete({
      where: { id }
    })
    return { success: true }
  } catch (error) {
    console.error('Failed to delete content:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to delete content'
    })
  }
})
