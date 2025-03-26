import crypto from 'crypto'

export const generateUnsubscribeToken = (): string => {
  return crypto.randomBytes(32).toString('hex')
}
