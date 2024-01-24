import { CaseCard } from './case-card'
import styled from 'styled-components'

const CardListContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
`

export const CaseList = ({ cases }: any) => {
	return (
		<CardListContainer>
			{cases.map((details: any, index: number) => (
				<CaseCard details={details} key={details?.id || index} />
			))}
		</CardListContainer>
	)
}
