import { PostgrestError, AuthError } from '@supabase/supabase-js'

export const handleError = (error: unknown): string => {
  if (typeof error === 'string'){
    return error
  }

  if (error instanceof PostgrestError) {
    console.error('Database error: ', error.message, '\nCode: ', error.code, '\nDetails: ', error.details)
    return 'There is a problem with the database at the moment.'
  }

  if (error instanceof AuthError) {
    console.error('Auth error: ', error.message, '\nCode: ', error.code, '\nStatus: ', error.status, '\nStack: ', error.stack )
    return error.message
  }
  if (error instanceof Error) {
    console.error('Application error: ', error.message, '\nStack: ', error.stack)
    return error.message
  }

  console.error('Unknown error: ', error)
  return 'An unknown error has occurred.'
}