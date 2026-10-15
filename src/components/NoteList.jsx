import DeleteIcon from '@mui/icons-material/Delete'
import {
  Alert,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material'

import { useDeleteNote, useNotes } from '@/hooks/useNotes'

const NoteList = ({ term }) => {
  const { data: notes, isLoading, error } = useNotes(term)
  const { mutate: remove, isPending, variables: deletingId } = useDeleteNote()

  if (isLoading) return <CircularProgress />
  if (error) return <Alert severity="error">{error.message}</Alert>
  if (!notes.length) return <Typography color="text.secondary">No notes found.</Typography>

  return (
    <List>
      {notes.map(note => (
        <ListItem
          key={note.id}
          divider
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="delete"
              disabled={isPending && deletingId === note.id}
              onClick={() => remove(note.id)}
            >
              <DeleteIcon />
            </IconButton>
          }
        >
          <ListItemText
            primary={note.title}
            secondary={`${note.body} · ${new Date(note.createdAt).toLocaleString()}`}
          />
        </ListItem>
      ))}
    </List>
  )
}

export default NoteList
