import express from 'express'

const app = express()
app.use(express.json())

// Allow the Vite dev server (another origin) to call us
app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': 'GET,POST,DELETE,OPTIONS',
  })
  if (req.method === 'OPTIONS') return res.sendStatus(204)
  next()
})

// Fake latency so loading states are visible
app.use((req, res, next) => setTimeout(next, 400))

let nextId = 3
let notes = [
  { id: 1, title: 'Welcome', body: 'From the Express server', createdAt: new Date().toISOString() },
  {
    id: 2,
    title: 'Layers',
    body: 'component -> hook -> action -> api',
    createdAt: new Date().toISOString(),
  },
]

app.get('/notes', (req, res) => {
  const { term } = req.query
  const result = term
    ? notes.filter(note => note.title.toLowerCase().includes(term.toLowerCase()))
    : notes
  res.json({ data: result })
})

app.post('/notes', (req, res) => {
  const { title, body } = req.body
  if (!title) return res.status(422).json({ errors: [{ message: 'title is required' }] })
  const note = { id: nextId++, title, body: body ?? '', createdAt: new Date().toISOString() }
  notes.push(note)
  res.status(201).json({ data: note })
})

app.delete('/notes/:id', (req, res) => {
  notes = notes.filter(note => note.id !== Number(req.params.id))
  res.sendStatus(204)
})

app.listen(4100, () => console.log('Notes API on http://localhost:4100'))
