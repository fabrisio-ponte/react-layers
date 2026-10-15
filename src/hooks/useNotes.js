import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'

import { createNote, deleteNote, getNotes } from '@/actions/notes'

const NOTES_KEY = ['notes']

export const useNotes = term =>
  useQuery({
    queryKey: [...NOTES_KEY, term],
    queryFn: () => getNotes(term),
    placeholderData: keepPreviousData,
  })

const useNotesMutation = (mutationFn, successMessage) => {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTES_KEY })
      enqueueSnackbar(successMessage, { variant: 'success' })
    },
    onError: error => enqueueSnackbar(error.message, { variant: 'error' }),
  })
}

export const useCreateNote = () => useNotesMutation(createNote, 'Note created')

export const useDeleteNote = () => useNotesMutation(deleteNote, 'Note deleted')
