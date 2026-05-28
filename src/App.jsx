import { Routes, Route } from 'react-router-dom'
import Landing          from '@/pages/Landing'
import Dashboard        from '@/pages/Dashboard'
import ResumeEditor     from '@/pages/ResumeEditor'
import PortfolioBuilder from '@/pages/PortfolioBuilder'
import Settings         from '@/pages/Settings'

export default function App() {
  return (
    <Routes>
      <Route path="/"          element={<Landing />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/resume"    element={<ResumeEditor />} />
      <Route path="/portfolio" element={<PortfolioBuilder />} />
      <Route path="/settings"  element={<Settings />} />
    </Routes>
  )
}