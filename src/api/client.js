import { create } from 'apisauce'

const client = create({
  baseURL: import.meta.env.VITE_REACT_APP_NOTES_API,
  headers: { Accept: 'application/json' },
})

export default client
