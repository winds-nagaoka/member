export type Client = {
  id: string
  agent: string
  token: string
  lastLogin: number
}

export type User = {
  name: string
  userid: string
  hash: string
  email: string | null
  emailAddress: null
  emailHash?: string
  emailValid: boolean
  emailValidKey: string | null
  emailValidExpire: number | null
  clientList: Client[]
  regTime: number
  scoreAdmin?: boolean
  admin?: boolean
  createdAt: string
  updatedAt: string
  _id: string
}
