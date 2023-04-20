import { IToken } from "@/types/api.type"

const SESSION_STORE = "session"

const getSession = (): IToken | null => {
  const sessionStore = sessionStorage.getItem(SESSION_STORE)

  if (sessionStore) {
    return JSON.parse(sessionStore)
  } else {
    return null
  }
}

export class TokenService {
  getAccessToken = (): string | null => {
    const session = getSession()
    return session?.accessToken ?? null
  }

  getRefreshToken = (): string | null => {
    const session = getSession()
    return session?.refreshToken ?? null
  }

  storeTokens = (tokens: IToken) => {
    sessionStorage.setItem(SESSION_STORE, JSON.stringify(tokens))
  }

  removeTokens = () => {
    sessionStorage.removeItem(SESSION_STORE)
  }
}
