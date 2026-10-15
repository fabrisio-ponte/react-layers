import { Container, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'

import NoteForm from '@/components/NoteForm'
import NoteList from '@/components/NoteList'

const App = () => {
  const [term, setTerm] = useState('')

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Typography variant="h4" component="h1">
          Notes
        </Typography>
        <NoteForm />
        <TextField
          label="Search by title"
          size="small"
          value={term}
          onChange={e => setTerm(e.target.value)}
        />
        <NoteList term={term} />
      </Stack>
    </Container>
  )
}

export default App
