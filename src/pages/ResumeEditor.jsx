import DashboardLayout from '@/components/layout/DashboardLayout'

export default function ResumeEditor() {
  return (
    <DashboardLayout>
      <h1 className="font-display text-3xl font-bold text-white mb-4">Resume Editor</h1>
      <p className="text-slate-400">Upload or paste your resume to get started.</p>
      {/* TODO: rich editor */}
    </DashboardLayout>
  )
}