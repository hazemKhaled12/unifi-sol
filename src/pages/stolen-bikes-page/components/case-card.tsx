import styled from 'styled-components'
import placholderbike from '@/assets/bike-placeholder.webp'

const CardContainer = styled.div`
	background-color: #f5f5f5;
	padding: 16px;
	border-radius: 8px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	width: 400px;
`

const CardTitle = styled.div`
	font-size: 18px;
	font-weight: bold;
	margin-bottom: 8px;
`

const CardDescription = styled.div`
	margin-bottom: 8px;
	color: lightgray;
`

const CardInfo = styled.div`
	margin-bottom: 8px;
	font-size: 14px;
`

const CardImage = styled.img`
	width: full;
	max-width: 400px;
	margin-bottom: 8px;
	height: 200px;
	background-color: gray;
`

export const CaseCard = ({ details }: any) => {
	const { title, description, stolen_location, large_img } = details

	const dateStolen = new Date(details.date_stolen * 1000).toLocaleDateString()

	return (
		<CardContainer>
			{large_img && <CardImage src={large_img} alt="Thumbnail" />}
			{!large_img && <CardImage src={placholderbike} alt="placholder" />}
			<CardTitle>{title}</CardTitle>
			<CardDescription>{description}</CardDescription>
			<CardInfo>Date of Theft: {dateStolen} </CardInfo>
			<CardInfo>Date of reporting: This was never found on the api</CardInfo>
			{<CardInfo>{stolen_location && `Stolen Location: ${stolen_location}`}</CardInfo>}
		</CardContainer>
	)
}
