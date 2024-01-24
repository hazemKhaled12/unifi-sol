import React, { useState, useEffect } from 'react'
import { CaseList } from './components/cases-list'
import { ErrorView } from './components/error-view'
import { HLoading } from '@/components/h-loading/h-loading'
import { EmptyView } from './components/empty-view'
import useGetBikes from './hooks/use-get-bikes'
import { useDebounce } from '@/hooks/use-debounce/use-debounce'

type Query = {
	page: number
	per_page: number
	query: string
	stolen_after: string | null
	stolen_before: string | null
	location: string
	stolenness: string
	distance: number
}

const StolenBikesPage: React.FC = () => {
	const [data, setData] = useState<any>([])
	const [query, setQuery] = useState<string>('')
	const [filters, setFilters] = useState<Query>({
		page: 0,
		per_page: 10,
		query: '',
		stolen_after: null,
		stolen_before: null,
		location: 'Munich',
		stolenness: 'proximity',
		distance: 10
	})
	const debouncedQuery = useDebounce(query)
	const { cases, error, loading, totalCases } = useGetBikes(filters, [
		filters.page,
		filters.query,
		filters.stolen_after,
		filters.stolen_before,
		filters.location
	])

	useEffect(() => {
		setFilters((prevQuery) => ({
			...prevQuery,
			query: debouncedQuery
		}))
	}, [debouncedQuery])

	const handlePageChange = (page: number) => {
		setFilters((prevQuery) => ({
			...prevQuery,
			page
		}))
	}

	const handleQuerychange = (query: string) => {
		setQuery(query)
	}

	const handleFilterDateRangeChange = (startDate: string | null, endDate: string | null) => {
		setFilters((prevQuery) => ({
			...prevQuery,
			stolen_after: startDate,
			stolen_before: endDate
		}))
	}

	return (
		<div>
			<div>
				<input
					type="text"
					placeholder="Filter by title"
					onChange={(e) => handleQuerychange(e.target.value)}
				/>
			</div>
			<div>
				<input
					type="date"
					placeholder="Start Date"
					onChange={(e) =>
						handleFilterDateRangeChange(
							Date.parse(e.target.value).toString(),
							filters.stolen_before
						)
					}
				/>
				<input
					type="date"
					placeholder="End Date"
					onChange={(e) =>
						handleFilterDateRangeChange(
							filters.stolen_after,
							Date.parse(e.target.value).toString()
						)
					}
				/>
			</div>

			{loading && <HLoading />}
			{error && <ErrorView error={'Error fetshing data, Feel free to try again'} />}
			{!loading && !error && cases.length === 0 && <EmptyView />}
			{!loading && !error && cases.length > 0 && (
				<div style={{ marginTop: '16px' }}>
					<div>
						<CaseList cases={cases} />
					</div>
					<div
						style={{ marginTop: '16px', display: 'flex', gap: '8px', justifyContent: 'end' }}
					>
						<button
							disabled={filters.page === 0 ? true : false}
							onClick={() => handlePageChange(filters.page - 1)}
						>
							Previous Page
						</button>
						<button
							disabled={filters.page >= Math.ceil(totalCases / 10) ? true : false}
							onClick={() => handlePageChange(filters.page + 1)}
						>
							Next Page
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default StolenBikesPage
