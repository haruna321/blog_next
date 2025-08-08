import { SWRConfiguration } from 'swr'
import { publicFetcher } from './fetcher'

export const swrConfig: SWRConfiguration = {
  fetcher: publicFetcher,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  errorRetryCount: 5,
}