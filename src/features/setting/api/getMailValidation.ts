import { useQuery } from 'react-query'
import { AUTH_API_URL } from '../../../config'
import { fetchApi } from '../../../library/fetch'
import { User } from '../../../types'
import { getSession } from '../../../utilities/session'

type MailValidationApi = {
  key: string
}

export type MailValidationResponse = {
  status: boolean
  err: {
    err?: boolean
    type: 'notMatchError' | 'DBError' | 'noDataError' | 'expiredError' | 'alreadyValid' | 'DBError'
  }
  valid?: boolean
  user: User
}

const getMailValidation = async ({ key }: MailValidationApi): Promise<MailValidationResponse> => {
  return await fetchApi(`${AUTH_API_URL}/user/valid`, { session: getSession(), key })
}

export const useMailValidation = (key: string) => {
  return useQuery({
    queryKey: ['mailValidation', key],
    queryFn: async () => await getMailValidation({ key }),
  })
}
