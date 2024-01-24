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

				const casesResponse = await BikesService.getBikesCases(query)
				const casesData = await casesResponse
				setCases(casesData.bikes)

				const totalCasesResponse = await BikesService.getBikesCasesCount({
					location: query.location,
					distance: query.distance,
					stolenness: query.stolenness,
					query: query.query
				})
				const totalCasesData = await totalCasesResponse
				setTotalCases(totalCasesData.stolen)

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
