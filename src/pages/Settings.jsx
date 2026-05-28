import DashboardLayout from '@/components/layout/DashboardLayout'

export default function Settings() {
  return (
    <DashboardLayout>
      <h1 className="font-display text-3xl font-bold text-white mb-4">Settings</h1>
      <p className="text-slate-400">Manage your account, billing, and integrations.</p>
      {/* TODO: settings panels */}
    </DashboardLayout>
  )
}