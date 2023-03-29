export type Session = {
  userid: string
  clientid: string
  clientToken: string
  useragent: string
  version: string
}

export type LoginRequest = {
  userid: string
  passwd: string
  clientid: string
  useragent: string
  version: string
}

export type RegisterRequest = {
  userid: string
  passwd: string
  key: string
  clientid: string
  useragent: string
  version: string
}
