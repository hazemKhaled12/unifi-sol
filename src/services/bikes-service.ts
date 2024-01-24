import { toQuery } from '@/utils'
import { ApiClient } from '@/services/api-client'

const getBikesCases = async (query?: Record<string, any>): Promise<any> => {
	const { data } = await ApiClient.client.get(`search?${toQuery(query)}`)
	return data
}

;`https://bikeindex.org/api/v3/search/count?query=stolen&location=Munich`
const getBikesCasesCount = async (query?: Record<string, any>): Promise<any> => {
	const { data } = await ApiClient.client.get(`search/count?${toQuery(query)}`)
	return data
}

export const BikesService = {
	getBikesCases: getBikesCases,
	getBikesCasesCount: getBikesCasesCount
}
