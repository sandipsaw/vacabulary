const STORAGE_KEY = 'vocab_users'

function loadUsers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function persistUsers(users) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
  } catch {}
}

const initialState = {
  users: loadUsers(),
  currentUser: null,
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'REGISTER': {
      const users = [action.payload, ...state.users]
      persistUsers(users)
      return { ...state, users }
    }
    case 'LOGIN': {
      const { email, password } = action.payload
      const user = state.users.find((u) => u.email === email && u.password === password)
      return { ...state, currentUser: user || null }
    }
    case 'LOGOUT':
      return { ...state, currentUser: null }
    default:
      return state
  }
}
