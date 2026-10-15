import client from './client'

export const fetchNotes = term => client.get('/notes', term ? { term } : undefined)

export const postNote = note => client.post('/notes', note)

export const removeNote = id => client.delete(`/notes/${id}`)
