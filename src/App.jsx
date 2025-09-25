import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Containment from './pages/Containment.jsx'

function App() {

  return (
      <Routes>
        <Route path="/" element={<Containment />} />
      </Routes>
  
  )
}

export default App
