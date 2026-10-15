import { fetchNotes, postNote, removeNote } from '@/api/notes'

// Turns an apisauce response into data, or throws an Error with a readable message
const unwrap = response => {
  if (response.ok) return response.data
  const message = response.data?.errors?.[0]?.message ?? response.originalError?.message
  throw new Error(message ?? 'Something went wrong')
}

export const getNotes = async term => unwrap(await fetchNotes(term)).data

export const createNote = async note => unwrap(await postNote(note)).data

export const deleteNote = async id => {
  unwrap(await removeNote(id))
  return id
}
