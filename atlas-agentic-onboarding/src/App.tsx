import { Route, Routes, NavLink } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import Dashboard from '@/pages/Dashboard'
import Agents from '@/pages/Agents'
import Workflows from '@/pages/Workflows'
import OnboardingBuilder from '@/pages/OnboardingBuilder'
import DataSources from '@/pages/DataSources'
import Settings from '@/pages/Settings'
import Help from '@/pages/Help'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/workflows" element={<Workflows />} />
        <Route path="/onboarding" element={<OnboardingBuilder />} />
        <Route path="/data" element={<DataSources />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </Layout>
  )
}
