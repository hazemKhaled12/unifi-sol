import React, { useState, useEffect } from 'react'
import { CaseList } from './components/cases-list'
import { ErrorView } from './components/error-view'
import { HLoading } from '@/components/h-loading/h-loading'
import { EmptyView } from './components/empty-view'

const StolenBikesPage: React.FC = () => {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [cases, setCases] = useState([])
	const [totalCases, setTotalCases] = useState(0)
	const [currentPage, setCurrentPage] = useState(1)
	const [pageSize, setPageSize] = useState(10)
	const [filterTitle, setFilterTitle] = useState('')
	const [filterStartDate, setFilterStartDate] = useState('')
	const [filterEndDate, setFilterEndDate] = useState('')

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true)
				setError(false)

				// Fetch the total number of bike theft cases
				const totalCasesResponse = await fetch(
					`https://bikeindex.org/api/v3/search/count?query=stolen&location=Munich`
				)
				const totalCasesData = await totalCasesResponse.json()
				setTotalCases(totalCasesData.count)

				// Fetch the bike theft cases based on pagination and filters
				const casesResponse = await fetch(
					`https://bikeindex.org/api/v3/search?page=${currentPage}&per_page=${pageSize}&query=stolen&location=Munich&title=${filterTitle}&stolen_after=${filterStartDate}&stolen_before=${filterEndDate}`
				)
				const casesData = await casesResponse.json()
				setCases(casesData.bikes)

				setLoading(false)
			} catch (error) {
				setError(true)
				setLoading(false)
			}
		}

		fetchData()
	}, [currentPage, pageSize, filterTitle, filterStartDate, filterEndDate])

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
	}

	const handleFilterTitleChange = (title: string) => {
		setFilterTitle(title)
	}

	const handleFilterDateRangeChange = (startDate: string, endDate: string) => {
		setFilterStartDate(startDate)
		setFilterEndDate(endDate)
	}

	return (
		<div>
			{loading && <HLoading />}
			{error && <ErrorView error={'Error fetshing data, Feel free to try again'} />}
			{!loading && !error && cases.length === 0 && <EmptyView />}
			{!loading && !error && cases.length > 0 && (
				<div>
					<div>
						<input
							type="text"
							placeholder="Filter by title"
							onChange={(e) => handleFilterTitleChange(e.target.value)}
						/>
					</div>
					<div>
						<input
							type="date"
							placeholder="Start Date"
							onChange={(e) => handleFilterDateRangeChange(e.target.value, filterEndDate)}
						/>
						<input
							type="date"
							placeholder="End Date"
							onChange={(e) => handleFilterDateRangeChange(filterStartDate, e.target.value)}
						/>
					</div>
					<div>
						<CaseList cases={cases} />
					</div>
					<div>
						<button onClick={() => handlePageChange(currentPage - 1)}>Previous Page</button>
						<button onClick={() => handlePageChange(currentPage + 1)}>Next Page</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default StolenBikesPage
