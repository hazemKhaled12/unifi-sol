import { CgSpinner } from 'react-icons/cg'
import styled, { keyframes } from 'styled-components'

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const LoadingContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 4px;
	margin: 6px;
`

const Spinner = styled(CgSpinner)`
	width: 40px;
	height: 40px;
	animation: ${spinAnimation} 1s linear infinite;
	color: #3182ce; /* Replace with your desired color */
`

export const HLoading = (props: any) => {
	const { label } = props
	return (
		<LoadingContainer>
			<Spinner />
		</LoadingContainer>
	)
}
