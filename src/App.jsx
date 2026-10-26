import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AdminPage } from './pages/administrador/AdminPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/administrador" replace />} />
        <Route path="/administrador/*" element={<AdminPage />} />
        <Route path="*" element={<Navigate to="/administrador" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
