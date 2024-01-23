import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import StolenBikesPage from './pages/stolen-bikes-page/stolen-bikes-page'

function App() {
	const [count, setCount] = useState(0)

	return (
		<>
			<StolenBikesPage />
		</>
	)
}

export default App
