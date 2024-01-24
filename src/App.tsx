import { useState } from 'react'

// import './App.css'
import StolenBikesPage from './pages/stolen-bikes-page/stolen-bikes-page'
import styled from 'styled-components'

const AppContainer = styled.div`
	box-sizing: border-box;
	margin: 0;
	display: flex;
	place-items: top center;
	width: 100%;
	min-height: 100vh;
	margin: 0 auto;
	padding: 1rem;
	text-align: center;
	overflow: hidden;
`

function App() {
	const [count, setCount] = useState(0)

	return (
		<AppContainer>
			<StolenBikesPage />
		</AppContainer>
	)
}

export default App
