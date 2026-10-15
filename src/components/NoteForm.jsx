import AddIcon from '@mui/icons-material/Add'
import { Button, Stack, TextField } from '@mui/material'
import { useState } from 'react'

import { useCreateNote } from '@/hooks/useNotes'

const NoteForm = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const { mutate, isPending } = useCreateNote()

  const handleSubmit = event => {
    event.preventDefault()
    mutate(
      { title, body },
      {
        onSuccess: () => {
          setTitle('')
          setBody('')
        },
      },
    )
  }

  return (
    <Stack component="form" spacing={2} onSubmit={handleSubmit}>
      <TextField label="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <TextField
        label="Body"
        multiline
        minRows={2}
        value={body}
        onChange={e => setBody(e.target.value)}
      />
      <Button type="submit" variant="contained" startIcon={<AddIcon />} disabled={isPending}>
        Add note
      </Button>
    </Stack>
  )
}

export default NoteForm
