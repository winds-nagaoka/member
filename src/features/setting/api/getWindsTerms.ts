import { useQuery } from 'react-query'
import { GITHUB_WINDS_TERMS } from '../../../config'
import { getTextApi } from '../../../library/fetch'

const getWindsTerms = async () => {
  return await getTextApi(GITHUB_WINDS_TERMS)
}

export const useWindsTerms = () => {
  return useQuery({
    queryKey: ['winds-terms'],
    queryFn: async () => await getWindsTerms(),
  })
}
