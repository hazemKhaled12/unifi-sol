import { useEffect, useState } from 'react'
import { BikesService } from '@/services/bikes-service'
// Custom hook to fetch the bike theft cases from the BikeIndex API
const useGetBikes = (
	query: {
		page: number
		per_page: number
		query: string
		stolen_after: string | null
		stolen_before: string | null
		location?: string
		stolenness?: string
		distance?: number
	} = {
		page: 0,
		per_page: 10,
		query: 'string',
		stolen_after: null,
		stolen_before: null,
		location: 'Munich',
		stolenness: 'proximity',
		distance: 10
	},
	dependencies: any[]
) => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [totalCases, setTotalCases] = useState(0)
	const [cases, setCases] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true)
				setError(false)
				// Fetch the total number of bike theft cases
				const totalCasesResponse = await BikesService.getBikesCasesCount(query)
				const totalCasesData = await totalCasesResponse
				console.log('totalCasesDatas', totalCasesResponse)
				setTotalCases(totalCasesData.totalCasesData)
				// console.log('totalCasesData', totalCasesData)

				// Fetch the bike theft cases based on pagination and filters
				// const casesResponse = await fetch(
				// 	`https://bikeindex.org/api/v3/search?page=${query.page}&per_page=${query.per_page}&query=stolen&location=Munich&title=${query.title}&stolen_after=${query.stolen_after}&stolen_before=${query.stolen_before}`
				// )
				const casesResponse = await BikesService.getBikesCases(query)
				const casesData = await casesResponse

				setCases(casesData.bikes)

				setLoading(false)
			} catch (error) {
				setError(true)
				setLoading(false)
			}
		}

		fetchData()
		return () => {}
	}, [...dependencies])

	return { loading, error, totalCases, cases }
}

export default useGetBikes
